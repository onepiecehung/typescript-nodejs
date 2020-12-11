import UserModel from "../models/user.model";
import { Schema } from "mongoose";
//!important: session only using for transaction => don't using it for 1 query

/**
 *
 * @param {Object} userInfo
 */
// export async function save(userInfo: any) {
//     let session: any = await mongoose.startSession();
//     try {
//         session.startTransaction();
//         let data = await userInfo.save({
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
export async function save(userInfo: any) {
    return userInfo.save();
}

/**
 *
 * @param {Object} userInfo
 */
export async function create(userInfo: any) {
    const userClass = new UserModel(userInfo);
    return userClass.save();
}

/**
 *
 * @param {String} email
 */
export async function findByEmail(email: string | any | null) {
    return UserModel.findOne({ email: email?.toLowerCase() });
}

/**
 *
 * @param {Object} query
 */
export async function findOne(query: any) {
    return UserModel.findOne(query);
}

/**
 *
 * @param userInfo
 */
export async function createModel(userInfo: any) {
    return new UserModel(userInfo);
}

/**
 *
 * @param userId
 */
export async function findById(userId: Schema.Types.ObjectId) {
    return UserModel.findById(userId);
}

export async function createModelEmpty() {
    return new UserModel();
}
