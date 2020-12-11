/// <reference types="mongoose" />
/// <reference types="mongoose-paginate-v2" />
import { IUser } from "../interfaces/user.interface";
/**
 *
 * @param {Object} userInfo
 */
export declare function login(userInfo: IUser, userAgent: any, ip: string): Promise<{
    user: Pick<Pick<import("mongoose")._LeanDocument<IUser>, "_id" | "status" | "createdAt" | "updatedAt" | "username" | "password" | "email" | "lastName" | "firstName" | "gender" | "birthday" | "phoneNumber" | "avatar">, "_id" | "status" | "createdAt" | "updatedAt" | "username" | "password" | "email" | "lastName" | "firstName" | "gender" | "birthday" | "phoneNumber" | "avatar">;
    accessToken: any;
    refreshToken: any;
}>;
/**
 *
 * @param {Object} userInfo
 */
export declare function register(userInfo: IUser): Promise<IUser>;
export declare function getAccessToken(locals: any): Promise<{
    accessToken: any;
}>;
