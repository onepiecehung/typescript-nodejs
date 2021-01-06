import { Document, Types } from "mongoose";

export enum Gender {
    Other = 0,
    Male = 1,
    Female = 2,
}

export interface IUser extends Document {
    lastName?: string | null;
    firstName?: string | null;
    username?: string | null;
    email?: string | null;
    password?: string | any | null;
    status?: string | any | null;
    gender?: Gender | any;
    birthday?: string | null;
    phoneNumber?: string | null;
    avatar?: string | null;
    createdAt?: number | Date | string | null;
    updatedAt?: number | Date | string | null;
}

export interface IUserSession extends Document {
    userAgent?: JSON | Object | any | null;
    currentAccessToken?: string | any;
    refreshToken?: string | any;
    user?: string | any;
    status?: string | any;
    latestAccessedAt?: number | Date | string | null;
    location?: string | any;
    uuid?: string | any;
    ip?: string | any;
    totalAccessTokenGranted?: number | string | any;
    createdAt?: number | Date | string | null;
    updatedAt?: number | Date | string | null;
}

export interface IUserBaseDocument extends IUser, Document {
    friends: Types.Array<string>;
    creditCards?: Types.Map<string>;
    fullName: string;
    getGender(): string;
}
