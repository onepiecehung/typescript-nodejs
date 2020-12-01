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
        let checkUser: IUser = await UserRepository.findByEmail(
            userInfo?.email
        );
        if (checkUser) {
        }
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}
