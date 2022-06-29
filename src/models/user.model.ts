import { genSaltSync, hashSync } from "bcrypt";
import { Document, model, Query, Schema } from "mongoose";

import { USER_STATUS } from "../config/user.config";
import { logger } from "../core/log/logger.mixed";
import { IUser, IUserBaseDocument } from "../interfaces/user.interface";

import { mongoosePagination, Pagination } from "./plugins/paginate";
// import snowflakeId from "./plugins/snowflake";

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
            enum: Object.values(USER_STATUS),
            default: USER_STATUS.ACTIVE,
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
        timestamps: true,
        collection: "Users", // TODO: Set name collection
    }
);

UserSchema.set("toJSON", {
    transform: (doc: any, ret: any) => {
        delete ret.status;
        delete ret.password;
        delete ret.__v;
    },
});

UserSchema.set("toObject", {
    transform: (doc: any, ret: any) => {
        // delete ret.status;
        // delete ret.password;
        delete ret.__v;
    },
});

// TODO: Virtual;
UserSchema.virtual("fullName").get(function (this: IUserBaseDocument) {
    return `${this.firstName} ${this.lastName}`;
});

// TODO: Methods
// UserSchema.methods.getGender = function (this: IUserBaseDocument) {
//     return this.gender > 0 ? "Male" : "Female";
// };

UserSchema.pre<IUser>("save", async function (next: any) {
    try {
        const _this = this;
        if (_this.isModified("password")) {
            const salt = genSaltSync(10);
            _this.password = hashSync(_this.password, salt);
        }

        // TODO: Update time for document
        if (_this.isNew) {
            Object.assign(_this.$locals, { wasNew: _this.isNew });
            // _this.$locals.wasNew = _this.isNew;
            // _this.createdAt = Date.now();
            // _this.updatedAt = Date.now();
        } else {
            // _this.updatedAt = Date.now();
        }

        next();
    } catch (error: any) {
        logger.error(error);
        throw new Error(error.message);
    }
});

UserSchema.post<IUser>("save", function (this: any) {
    try {
        const _this = this;
        // ! This is a document after save
        if (_this?.$locals?.wasNew) {
            // new document
        } else {
            // old document
        }
    } catch (error: any) {
        throw new Error(error);
    }
});

// TODO: Log error
UserSchema.post<IUser>("save", (error: any, doc: any, next: any) => {
    if (process.env.NODE_ENV === "development") {
        logger.log(doc);
    }
    if (error.name === "MongoError" && error.code === 11000)
        next(new Error("This user already exists, please try again"));
    else next(error);
});

// TODO: Query
UserSchema.pre<Query<Document, IUser, IUser>>("findOne", async function () {
    // Prints "{ email: 'bill@microsoft.com' }"
    if (process.env.NODE_ENV === "development") {
        logger.log(this.getFilter());
    }
});

// UserSchema.pre<IUser>("findOne", function () {
//     // Prints "{ email: 'bill@microsoft.com' }"
//     logger.log(this.getFilter());
// });

// Query middleware
// UserSchema.post<Query<IUser>>("findOneAndUpdate", async function (doc) {
// })

// Set up PaginateModel
UserSchema.plugin(mongoosePagination);
// UserSchema.plugin(snowflakeId);

// Default export
export default model<IUser, Pagination<IUser>>("User", UserSchema);
