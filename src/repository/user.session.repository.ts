import { Schema } from "mongoose";

import UserSessionModel from "../models/user.session.model";

//!important: session only using for transaction => don't using it for 1 query

/**
 *
 * @param {Object} userSessionInfo
 */
// export async function save(userSessionInfo: any) {
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
export async function save(userSessionInfo: any) {
    return userSessionInfo.save();
}

/**
 *
 * @param {Object} userSessionInfo
 */
export async function create(userSessionInfo: any) {
    const userSessionClass = new UserSessionModel(userSessionInfo);
    return userSessionClass.save();
}

/**
 *
 * @param {Object} query
 */
export async function findOne(query: any) {
    return UserSessionModel.findOne(query);
}

/**
 *
 * @param userSessionInfo
 */
export async function createModel(userSessionInfo: any) {
    return new UserSessionModel(userSessionInfo);
}

/**
 *
 * @param userSessionId
 */
export async function findById(userSessionId: Schema.Types.ObjectId) {
    return UserSessionModel.findById(userSessionId);
}

/**
 *
 * @param filters
 * @param update
 */
export async function findOneAndUpdateUpsert(filters: any, update: any) {
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
export async function find(filters: any) {
    return UserSessionModel.find(filters);
}

/**
 *
 * @param filters
 * @param update
 */
export async function updateMany(filters: any, update: any) {
    return UserSessionModel.updateMany(filters, update);
}
