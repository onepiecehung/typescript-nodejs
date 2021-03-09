import { Schema } from "mongoose";
/**
 *
 * @param {Object} userSessionInfo
 */
export declare function save(userSessionInfo: any): Promise<any>;
/**
 *
 * @param {Object} userSessionInfo
 */
export declare function create(userSessionInfo: any): Promise<import("../interfaces/user.interface").IUserSession>;
/**
 *
 * @param {Object} query
 */
export declare function findOne(query: any): Promise<import("../interfaces/user.interface").IUserSession | null>;
/**
 *
 * @param userSessionInfo
 */
export declare function createModel(userSessionInfo: any): Promise<import("../interfaces/user.interface").IUserSession>;
/**
 *
 * @param userSessionId
 */
export declare function findById(userSessionId: Schema.Types.ObjectId): Promise<import("../interfaces/user.interface").IUserSession | null>;
/**
 *
 * @param filters
 * @param update
 */
export declare function findOneAndUpdateUpsert(filters: any, update: any): Promise<{
    ok: number;
    n: number;
    nModified: number;
}>;
/**
 *
 * @param filters
 */
export declare function find(filters: any): Promise<import("../interfaces/user.interface").IUserSession[]>;
/**
 *
 * @param filters
 * @param update
 */
export declare function updateMany(filters: any, update: any): Promise<{
    ok: number;
    n: number;
    nModified: number;
}>;
