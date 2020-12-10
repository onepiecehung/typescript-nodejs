import { IUser } from "../interfaces/user.interface";
/**
 *
 * @param {Object} userInfo
 */
export declare function login(userInfo: IUser): Promise<{
    user: any;
    accessToken: any;
    refreshToken: any;
}>;
/**
 *
 * @param {Object} userInfo
 */
export declare function register(userInfo: IUser): Promise<IUser>;
