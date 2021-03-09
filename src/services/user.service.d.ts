/// <reference types="mongoose" />
import { IUser } from "../interfaces/user.interface";
/**
 *
 * @param {Object} userInfo
 */
export declare function login(userInfo: IUser, locals: any): Promise<{
    user: import("mongoose").LeanDocument<IUser>;
    accessToken: any;
    refreshToken: any;
}>;
/**
 *
 * @param {Object} userInfo
 */
export declare function register(userInfo: IUser): Promise<IUser>;
/**
 *
 * @param locals
 */
export declare function getAccessToken(locals: any): Promise<{
    accessToken: any;
}>;
/**
 *
 * @param token
 */
export declare function logout(token: any): Promise<{
    message: string;
    statusCodeResponse: number;
}>;
/**
 *
 * @param userInfo
 * @param payload
 */
export declare function changePassword(userInfo: IUser, payload: any): Promise<{
    message: string;
    statusCodeResponse: number;
}>;
