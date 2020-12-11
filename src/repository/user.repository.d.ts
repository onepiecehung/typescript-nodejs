import { Schema } from "mongoose";
/**
 *
 * @param {Object} userInfo
 */
export declare function save(userInfo: any): Promise<any>;
/**
 *
 * @param {Object} userInfo
 */
export declare function create(userInfo: any): Promise<import("../interfaces/user.interface").IUser>;
/**
 *
 * @param {String} email
 */
export declare function findByEmail(email: string | any | null): Promise<import("../interfaces/user.interface").IUser | null>;
/**
 *
 * @param {Object} query
 */
export declare function findOne(query: any): Promise<import("../interfaces/user.interface").IUser | null>;
/**
 *
 * @param userInfo
 */
export declare function createModel(userInfo: any): Promise<import("../interfaces/user.interface").IUser>;
/**
 *
 * @param userId
 */
export declare function findById(userId: Schema.Types.ObjectId): Promise<import("../interfaces/user.interface").IUser | null>;
export declare function createModelEmpty(): Promise<import("../interfaces/user.interface").IUser>;
