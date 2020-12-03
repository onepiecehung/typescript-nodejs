import { IUser } from "../interfaces/user.interface";
/**
 *
 * @param {Object} userInfo
 */
export declare function login(userInfo: IUser): Promise<any>;
/**
 *
 * @param {Object} userInfo
 */
export declare function register(userInfo: IUser): Promise<IUser>;
