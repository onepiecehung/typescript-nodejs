import LogAPIModel from "../models/logAPI.model";

/**
 *
 * @param {Object} LogAPIInfo
 * @returns
 */
export async function save(LogAPIInfo: any) {
    return LogAPIInfo.save();
}

/**
 *
 * @param {Object} LogAPIInfo
 * @returns
 */
export async function create(LogAPIInfo: any) {
    const logAPIClass = new LogAPIModel(LogAPIInfo);
    return logAPIClass.save();
}
