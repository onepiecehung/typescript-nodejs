import UserModel from "@models/user.model";
import { ObjectId } from "mongoose";
// !important: session only using for transaction => don't using it for 1 query

export default new (class UserRepository {
    constructor() {}
    /**
     *
     * @param {Object} userInfo
     */
    // public async  save(userInfo: any) {
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
    public async save(userInfo: any) {
        return userInfo.save().exec();
    }

    /**
     *
     * @param {Object} userInfo
     */
    public async create(userInfo: any) {
        const userClass = new UserModel(userInfo);
        return userClass.save();
    }

    /**
     *
     * @param {String} email
     */
    public async findByEmail(email: string | any | null) {
        return UserModel.findOne({ email: email?.toLowerCase() }).exec();
    }

    /**
     *
     * @param {Object} query
     */
    public async findOne(query: any) {
        return UserModel.findOne(query).exec();
    }

    /**
     *
     * @param userInfo
     */
    public async createModel(userInfo: any) {
        return new UserModel(userInfo);
    }

    /**
     *
     * @param userId
     */
    public async findById(userId: ObjectId) {
        return UserModel.findById(userId).exec();
    }

    public async createModelEmpty() {
        return new UserModel();
    }
})();
