import { compareSync } from "bcrypt";

import { JOB_NAME } from "../config/rabbit.config";
import RABBIT from "../connector/rabbitmq/init/index";
import * as Redis from "../connector/redis/index";
import {
    USER_ERROR_CODE,
    USER_ERROR_MESSAGE,
} from "../errors/messages/user.error.message";
import { IUser, IUserSession } from "../interfaces/user.interface";
import * as UserRepository from "../repository/user.repository";
import * as UserSessionRepository from "../repository/user.session.repository";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/jwt/generate.jwt";
import { logger } from "../utils/log/logger.mixed";

/**
 *
 * @param {Object} userInfo
 */
export async function login(userInfo: IUser, userAgent: any, ip: string) {
    try {
        let user: IUser | null = await UserRepository.createModelEmpty();
        if (userInfo?.username) {
            let myKey: string = `LOGIN:username_${userInfo?.username}`;
            user = await Redis.getJson(myKey);

            if (!user) {
                user = await UserRepository.findOne({
                    username: userInfo?.username?.toLowerCase(),
                });
                if (user) {
                    await Redis.setJson(myKey, user?.toObject(), 60);
                }
            } else user = await UserRepository.createModel(user);
        }
        if (userInfo?.email) {
            let myKey: string = `LOGIN:email_${userInfo?.email}`;
            user = await Redis.getJson(myKey);

            if (!user) {
                user = await UserRepository.findByEmail(userInfo?.email);
                if (user) {
                    await Redis.setJson(myKey, user?.toObject(), 60);
                }
            } else user = await UserRepository.createModel(user);
        }

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
        });

        let refreshToken: any = await generateRefreshToken({
            _id: user?._id,
            ip: ip,
        });

        await RABBIT.sendDataToRabbit(JOB_NAME.USER_SESSION_WRITE, {
            user: user?._id,
            userAgent: userAgent?.getResult(),
            currentAccessToken: accessToken,
            refreshToken: refreshToken,
            ip: ip,
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

export async function getAccessToken(locals: any) {
    try {
        let userAgent: any = locals?.userAgent?.getResult();

        let checkIP: IUserSession | null = await UserSessionRepository.findOne({
            ip: locals?.ip,
            status: "active",
            user: locals?.user?._id,
            "userAgent.ua": userAgent.ua,
            refreshToken: locals?.refreshToken,
        });

        if (!checkIP) {
            return Promise.reject({
                message:
                    USER_ERROR_MESSAGE.YOUR_IP_IS_NOT_ALLOWED_TO_GET_ACCESS_TOKEN +
                    `. Your IP: ${locals?.ip}`,
                statusCode: 406,
                statusCodeResponse:
                    USER_ERROR_CODE.YOUR_IP_IS_NOT_ALLOWED_TO_GET_ACCESS_TOKEN,
            });
        }

        let accessToken: any = await generateAccessToken({
            _id: locals?.user?._id,
            ip: locals?.user?.ip,
        });

        checkIP?.set("currentAccessToken", accessToken);
        await UserSessionRepository.save(checkIP);

        return Promise.resolve({ accessToken });
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}
