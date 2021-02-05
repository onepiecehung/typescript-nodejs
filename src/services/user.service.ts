import { compareSync } from "bcrypt";
import { lookup } from "geoip-lite";
import { v4 as uuidv4 } from "uuid";

import { JOB_NAME } from "../config/rabbit.config";
import RABBIT from "../connector/rabbitmq/init/index";
import * as Redis from "../connector/redis/index";
import { IUser, IUserSession } from "../interfaces/user.interface";
import {
    USER_ERROR_CODE,
    USER_ERROR_MESSAGE,
} from "../messages/errors/user.error.message";
import {
    USER_SUCCESS_CODE,
    USER_SUCCESS_MESSAGE,
} from "../messages/success/user.success.message";
import * as UserRepository from "../repository/user.repository";
import * as UserSessionRepository from "../repository/user.session.repository";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../core/jwt/generate.jwt";
import { logger } from "../core/log/logger.mixed";

/**
 *
 * @param {Object} userInfo
 */
export async function login(userInfo: IUser, locals: any) {
    try {
        let uuid: any = locals?.uuid;
        let userAgent: any = locals?.userAgent;
        let ip: any = locals?.ip;

        let user: IUser | null = await UserRepository.createModelEmpty();

        let loginRedisKey: string = `Login_userId_${userInfo?.id}`;

        user = await Redis.getJson(loginRedisKey);

        if (!user) {
            user = await UserRepository.findOne({
                $or: [
                    {
                        username: userInfo.id,
                    },
                    {
                        email: userInfo.id,
                    },
                ],
            });

            if (user) {
                await Redis.setJson(loginRedisKey, user?.toObject(), 60);
            }
        } else user = await UserRepository.createModel(user);

        if (!user) {
            return Promise.reject({
                message: USER_ERROR_MESSAGE.USERNAME_NOT_FOUND,
                statusCode: 410,
                statusCodeResponse: USER_ERROR_CODE.USERNAME_NOT_FOUND,
            });
        }

        if (user?.status !== "active") {
            return Promise.reject({
                message: USER_ERROR_MESSAGE.USER_HAS_BEED_ + user?.status,
                statusCode: 410,
                statusCodeResponse: USER_ERROR_CODE.USER_HAS_BEED_,
            });
        }

        let passwordCorrect = await compareSync(
            userInfo?.password,
            user?.password
        );

        if (!passwordCorrect) {
            return Promise.reject({
                message: USER_ERROR_MESSAGE.PASSWORD_INCORRECT,
                statusCode: 410,
                statusCodeResponse: USER_ERROR_CODE.PASSWORD_INCORRECT,
            });
        }

        let accessToken: any = await generateAccessToken({
            _id: user?._id,
            ip: ip,
            uuid: uuid,
        });

        let tokenRedisKey: string = `AToken_UserId_${user?._id}_uuid_${uuid}`;

        await Redis.setJson(tokenRedisKey, accessToken, 60 * 60);

        let refreshToken: any = await generateRefreshToken({
            _id: user?._id,
            ip: ip,
            uuid: uuid,
        });

        await RABBIT.sendDataToRabbit(JOB_NAME.USER_SESSION_WRITE, {
            user: user?._id,
            userAgent: userAgent?.getResult(),
            ip: ip,
            uuid: uuid,
        });

        return Promise.resolve({
            user: user?.toJSON(),
            accessToken: accessToken,
            refreshToken: refreshToken,
        });

        // return Promise.reject({
        //     message: USER_ERROR_MESSAGE.USER_LOGIN_FAILED,
        //     statusCode: 417,
        //     statusCodeResponse: USER_ERROR_CODE.USER_LOGIN_FAILED,
        // });
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

/**
 *
 * @param {Object} userInfo
 */
export async function register(userInfo: IUser) {
    try {
        let checkEmail: IUser | null = await UserRepository.findByEmail(
            userInfo?.email
        );

        if (checkEmail) {
            return Promise.reject({
                message: USER_ERROR_MESSAGE.EMAIL_EXIST,
                statusCode: 410,
                statusCodeResponse: USER_ERROR_CODE.EMAIL_EXIST,
            });
        }
        let checkUsername: IUser | null = await UserRepository.findOne({
            username: userInfo?.username?.toLowerCase(),
        });
        if (checkUsername) {
            return Promise.reject({
                message: USER_ERROR_MESSAGE.USERNAME_EXIST,
                statusCode: 410,
                statusCodeResponse: USER_ERROR_CODE.USERNAME_EXIST,
            });
        }
        let data: IUser = await UserRepository.create(userInfo);
        return Promise.resolve(data);
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

/**
 *
 * @param locals
 */
export async function getAccessToken(locals: any) {
    try {
        let checkUserSession: IUserSession | null = await UserSessionRepository.findOne(
            {
                uuid: locals?.user?.uuid,
                user: locals?.user?._id,
                status: "active",
                // ip: locals?.user?.ip,
            }
        );

        if (!checkUserSession) {
            return Promise.reject({
                message:
                    USER_ERROR_MESSAGE.YOUR_DEVICE_IS_NOT_ALLOWED_TO_GET_ACCESS_TOKEN,
                statusCode: 406,
                statusCodeResponse:
                    USER_ERROR_CODE.YOUR_DEVICE_IS_NOT_ALLOWED_TO_GET_ACCESS_TOKEN,
            });
        }

        let accessToken: any = await generateAccessToken({
            _id: locals?.user?._id,
            ip: locals?.ip,
            uuid: locals?.user?.uuid,
        });
        let accessTokenKey: string = `AToken_UserId_${locals?.user?._id}_uuid_${locals?.user?.uuid}`;

        await Redis.setJson(accessTokenKey, accessToken, 60 * 60);

        let checkUserSessionExist: IUserSession | null = await UserSessionRepository.findOne(
            {
                uuid: locals?.user?.uuid,
                user: locals?.user?._id,
                status: "active",
                ip: locals?.ip,
            }
        );

        if (checkUserSessionExist) {
            await UserSessionRepository.save(checkUserSessionExist);
        } else {
            let data = await UserSessionRepository.create({
                userAgent: checkUserSession?.userAgent,
                user: locals?.user?._id,
                uuid: locals?.user?.uuid,
                status: "active",
                ip: locals?.ip,
                location: lookup(locals?.ip),
            });

            //TODO: Send email to get AccessToken form new location
            await RABBIT.sendDataToRabbit(
                JOB_NAME.ACCESS_TOKEN_FROM_NEW_LOCATION,
                data
            );
        }

        return Promise.resolve({ accessToken });
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

/**
 *
 * @param token
 */
export async function logout(token: any) {
    try {
        await UserSessionRepository.updateMany(
            {
                uuid: token?.uuid,
            },
            {
                status: "logout",
            }
        );

        let accessTokenKey: string = `AToken_UserId_${token?._id}_uuid_${token?.uuid}`;

        await Redis.deleteKey(accessTokenKey);

        return Promise.resolve({
            message: USER_SUCCESS_MESSAGE.USER_HAVE_BEEN_LOGGED_OUT,
            statusCodeResponse: USER_SUCCESS_CODE.USER_HAVE_BEEN_LOGGED_OUT,
        });
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

/**
 *
 * @param userInfo
 * @param payload
 */
export async function changePassword(userInfo: IUser, payload: any) {
    try {
        if (payload?.oldPassword === payload?.newPassword) {
            return Promise.reject({
                message:
                    USER_ERROR_MESSAGE.THE_NEW_PASSWORD_CANNOT_BE_THE_SAME_AS_THE_OLD_ONE,
                statusCode: 410,
                statusCodeResponse:
                    USER_ERROR_CODE.THE_NEW_PASSWORD_CANNOT_BE_THE_SAME_AS_THE_OLD_ONE,
            });
        }

        let userData: IUser | null = await UserRepository.findById(
            userInfo?._id
        );

        let passwordCorrect = await compareSync(
            payload?.oldPassword,
            userData?.password
        );

        if (!passwordCorrect) {
            return Promise.reject({
                message: USER_ERROR_MESSAGE.PASSWORD_INCORRECT,
                statusCode: 410,
                statusCodeResponse: USER_ERROR_CODE.PASSWORD_INCORRECT,
            });
        }

        userData?.set("password", payload?.newPassword);

        await UserRepository.save(userData);

        return Promise.resolve({
            message: USER_SUCCESS_MESSAGE.PASSWORD_HAVE_BEEN_CHANGED,
            statusCodeResponse: USER_SUCCESS_CODE.PASSWORD_HAVE_BEEN_CHANGED,
        });
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}
