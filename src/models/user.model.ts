import bcrypt from "bcrypt";
import { Document, model, PaginateModel, Query, Schema } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";

import { USER_STATUS } from "../config/user.config";
import { Gender, IUser } from "../interfaces/user.interface";

const UserSchema: Schema = new Schema(
    {
        lastName: {
            type: Schema.Types.String,
            trim: true,
            default: null,
        },
        firstName: {
            type: Schema.Types.String,
            trim: true,
            default: null,
        },
        username: {
            type: Schema.Types.String,
            trim: true,
            index: true,
            unique: true,
            sparse: true,
            lowercase: true,
        },
        email: {
            type: Schema.Types.String,
            trim: true,
            index: true,
            unique: true,
            sparse: true,
            lowercase: true,
        },
        password: {
            type: Schema.Types.String,
            trim: true,
        },
        gender: {
            type: Schema.Types.Number,
            enum: [0, 1, 2],
            default: 0,
        },
        birthday: {
            type: Schema.Types.Date,
            default: null,
        },
        phoneNumber: {
            type: Schema.Types.String,
            default: null,
        },
        avatar: {
            type: Schema.Types.String,
            default: null,
        },
        status: {
            type: Schema.Types.String,
            enum: USER_STATUS,
            default: USER_STATUS[0],
        },
        createdAt: {
            type: Schema.Types.Date,
            default: null,
        },
        updatedAt: {
            type: Schema.Types.Date,
            default: null,
        },
    },
    {
        collection: "Users", //TODO: Set name collection
    }
);

//TODO: Virtual
UserSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

//TODO: Methods
UserSchema.methods.getGender = function () {
    return this.gender > 0 ? "Male" : "Female";
};
UserSchema.pre<IUser>("save", async function (next) {
    try {
        const _this = this;
        if (_this.isModified("password")) {
            const salt = bcrypt.genSaltSync(10);
            _this.password = bcrypt.hashSync(_this.password, salt);
            this.password = _this.password;
        }

        next();
    } catch (error) {
        throw new Error(error.message);
    }
});

UserSchema.post<IUser>("save", function (error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000)
        next(new Error("This user already exists, please try again"));
    else next(error);
});

//TODO: Query
UserSchema.pre<Query<IUser>>("findOne", function () {
    // Prints "{ email: 'bill@microsoft.com' }"
    console.log(this.getFilter());
});

// Query middlewares
// UserSchema.post<Query<IUser>>("findOneAndUpdate", async function (doc) {
// })

//Set up PaginateModel
UserSchema.plugin(MongoosePaginate);

interface Model<T extends Document> extends PaginateModel<T> {}

// Default export
export default model<IUser>("User", UserSchema);
