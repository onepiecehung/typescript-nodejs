/// <reference types="mongoose" />
/// <reference types="mongoose-paginate-v2" />
import { IUser } from "../interfaces/user.interface";
/**
 *
 * @param {Object} userInfo
 */
export declare function login(userInfo: IUser, userAgent: any, ip: string): Promise<{
    user: Pick<Pick<import("mongoose")._LeanDocument<IUser>, "_id" | "__v" | "id" | "lastName" | "firstName" | "username" | "email" | "password" | "status" | "gender" | "birthday" | "phoneNumber" | "avatar" | "createdAt" | "updatedAt">, "_id" | "__v" | "id" | "lastName" | "firstName" | "username" | "email" | "password" | "status" | "gender" | "birthday" | "phoneNumber" | "avatar" | "createdAt" | "updatedAt">;
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
