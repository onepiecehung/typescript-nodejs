import { ObjectId } from "mongoose";

import UserSessionModel from "@models/userSession.model";

// !important: session only using for transaction => don't using it for 1 query

export default new (class UserSessionRepository {
    constructor() {}
    /**
     *
     * @param {Object} userSessionInfo
     */
    // public async  save(userSessionInfo: any) {
    //     let session: any = await mongoose.startSession();
    //     try {
    //         session.startTransaction();
    //         let data = await userSessionInfo.save({
    //             session: session,
    //         });
    //         await session.commitTransaction();
    //         session.endSession();
    //         return data;
    //     } catch (error) {
    //         await session.abortTransaction();
    //         session.endSession();
    //         return false;
    //     }
    // }
    public async save(userSessionInfo: any) {
        return userSessionInfo.save();
    }

    /**
     *
     * @param {Object} userSessionInfo
     */
    public async create(userSessionInfo: any) {
        const userSessionClass = new UserSessionModel(userSessionInfo);
        return userSessionClass.save();
    }

    /**
     *
     * @param {Object} query
     */
    public async findOne(query: any) {
        return UserSessionModel.findOne(query);
    }

    /**
     *
     * @param userSessionInfo
     */
    public async createModel(userSessionInfo: any) {
        return new UserSessionModel(userSessionInfo);
    }

    /**
     *
     * @param userSessionId
     */
    public async findById(userSessionId: ObjectId) {
        return UserSessionModel.findById(userSessionId);
    }

    /**
     *
     * @param filters
     * @param update
     */
    public async findOneAndUpdateUpsert(filters: any, update: any) {
        return UserSessionModel.updateOne(
            filters,
            { $set: update },
            {
                upsert: true,
            }
        );
    }

    /**
     *
     * @param filters
     */
    public async find(filters: any) {
        return UserSessionModel.find(filters);
    }

    /**
     *
     * @param filters
     * @param update
     */
    public async updateMany(filters: any, update: any) {
        return UserSessionModel.updateMany(filters, update);
    }
})();
