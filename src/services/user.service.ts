import {
    USER_ERROR_CODE,
    USER_ERROR_MESSAGE,
} from "../errors/messages/user.error.message";
import { IUser } from "../interfaces/user.interface";
import * as UserRepository from "../repository/user.repository";
import { logger } from "../utils/log/logger.mixed";

/**
 *
 * @param {Object} userInfo
 */
export async function login(userInfo: IUser) {
    try {
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
