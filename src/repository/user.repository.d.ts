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
