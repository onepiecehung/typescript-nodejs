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

/**
 *
 * @param LogAPIInfo
 * @returns
 */
export async function findOneAndUpdate(LogAPIInfo: any) {
    return LogAPIModel.updateOne(
        { uuid: LogAPIInfo.uuid },
        {
            $set: LogAPIInfo,
        },
        { upsert: true }
    );
}
