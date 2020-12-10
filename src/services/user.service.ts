import { compareSync } from "bcrypt";

import * as Redis from "../connector/redis/index";
import {
    USER_ERROR_CODE,
    USER_ERROR_MESSAGE,
} from "../errors/messages/user.error.message";
import { IUser } from "../interfaces/user.interface";
import * as UserRepository from "../repository/user.repository";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/jwt/generate.jwt";
import { logger } from "../utils/log/logger.mixed";

/**
 *
 * @param {Object} userInfo
 */
export async function login(userInfo: IUser) {
    try {
        if (userInfo?.username) {
            let myKey: string = `username_${userInfo?.username}`;
            let user = await Redis.getJson(myKey);

            if (!user) {
                user = await UserRepository.findOne({
                    username: userInfo?.username?.toLowerCase(),
                });
                if (user) {
                    await Redis.setJson(myKey, user?.toObject(), 60);
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
            });

            let refreshToken: any = await generateRefreshToken({
                _id: user?._id,
            });

            return Promise.resolve({
                user: user?.toJSON(),
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        }
        if (userInfo?.email) {
            let myKey: string = `email_${userInfo?.email}`;
            let user = await Redis.getJson(myKey);

            if (!user) {
                user = await UserRepository.findByEmail(userInfo?.email);
                if (user) {
                    await Redis.setJson(myKey, user?.toObject(), 60);
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
            });

            let refreshToken: any = await generateRefreshToken({
                _id: user?._id,
            });

            return Promise.resolve({
                user: user?.toJSON(),
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        }

        return Promise.reject({
            message: USER_ERROR_MESSAGE.USER_LOGIN_FAILED,
            statusCode: 417,
            statusCodeResponse: USER_ERROR_CODE.USER_LOGIN_FAILED,
        });
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
