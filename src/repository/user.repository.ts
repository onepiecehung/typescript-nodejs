import UserModel from "../models/user.model";
import mongoose from "mongoose";
/**
 *
 * @param {Object} userInfo
 */
//!important: session only using for transaction => don't using it for 1 query
export async function save(userInfo: any) {
    let session: any = await mongoose.startSession();
    try {
        session.startTransaction();
        let data = await userInfo.save({
            session: session,
        });
        await session.commitTransaction();
        session.endSession();
        return data;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return false;
    }
}

/**
 *
 * @param {Object} userInfo
 */
export async function create(userInfo: any) {
    let session: any = await mongoose.startSession();
    try {
        session.startTransaction();
        const userClass = new UserModel(userInfo);
        let data = userClass.save({
            session: session,
        });
        await session.commitTransaction();
        session.endSession();
        return data;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return false;
    }
}

/**
 *
 * @param {String} email
 */
export async function findByEmail(email) {
    return UserModel.findOne({ email: email.toLowerCase() });
}
