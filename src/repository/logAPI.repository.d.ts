/**
 *
 * @param {Object} LogAPIInfo
 * @returns
 */
export declare function save(LogAPIInfo: any): Promise<any>;
/**
 *
 * @param {Object} LogAPIInfo
 * @returns
 */
export declare function create(LogAPIInfo: any): Promise<import("../interfaces/logAPI.interface").ILogAPI>;
/**
 *
 * @param LogAPIInfo
 * @returns
 */
export declare function findOneAndUpdate(LogAPIInfo: any): Promise<{
    ok: number;
    n: number;
    nModified: number;
}>;
