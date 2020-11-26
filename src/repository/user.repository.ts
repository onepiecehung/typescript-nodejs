import UserModel from '../models/user.model';

/**
 *
 * @param {Object} userInfo
 */
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
export async function findByEmail(email) {
    return UserModel.findOne({ email: email.toLowerCase() });
}