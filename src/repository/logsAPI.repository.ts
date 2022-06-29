import LogAPIModel from "../models/logsAPI.model";

export default new (class Logs {
    constructor() {}
    /**
     *
     * @param {Object} LogAPIInfo
     * @returns
     */
    public async save(LogAPIInfo: any) {
        return LogAPIInfo.save();
    }

    /**
     *
     * @param {Object} LogAPIInfo
     * @returns
     */
    public async create(LogAPIInfo: any) {
        const logAPIClass = new LogAPIModel(LogAPIInfo);
        return logAPIClass.save();
    }

    /**
     *
     * @param LogAPIInfo
     * @returns
     */
    public async findOneAndUpdate(LogAPIInfo: any) {
        return LogAPIModel.updateOne(
            { uuid: LogAPIInfo.uuid },
            {
                $set: LogAPIInfo,
            },
            { upsert: true }
        );
    }
})();
