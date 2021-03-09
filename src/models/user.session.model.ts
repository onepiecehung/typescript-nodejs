import { Document, model, Query, Schema } from "mongoose";
// import MongoosePaginate from "mongoose-paginate-v2";

import { logger } from "../core/log/logger.mixed";
import { IUserSession } from "../interfaces/user.interface";

const UserSessionSchema: Schema = new Schema(
    {
        userAgent: {
            type: Schema.Types.Mixed,
            default: null,
        },
        // currentAccessToken: {
        //     type: Schema.Types.String,
        //     default: null,
        // },
        // refreshToken: {
        //     type: Schema.Types.String,
        //     default: null,
        //     index: true,
        // },
        user: {
            type: Schema.Types.ObjectId,
            default: null,
            index: true,
        },
        status: {
            type: Schema.Types.String,
            enum: ["active", "logout", "expired", "banned", "blocked"],
            default: "active",
        },
        latestAccessedAt: { type: Schema.Types.Date, default: Date.now() },
        location: {
            type: Schema.Types.Mixed,
            default: null,
        },
        ip: {
            type: Schema.Types.String,
            default: null,
        },
        totalAccessTokenGranted: {
            type: Schema.Types.Number,
            default: 0,
        },
        uuid: {
            type: Schema.Types.String,
            required: true,
            index: true,
        },
    },
    {
        collection: "UserSessions",
        timestamps: true,
    }
);

UserSessionSchema.set("toJSON", {
    transform: function (doc: any, ret: any) {
        ret.createdAt = ret.createdAt?.getTime();
        ret.updatedAt = ret.updatedAt?.getTime();
        delete ret.__v;
    },
});

UserSessionSchema.set("toObject", {
    transform: function (doc: any, ret: any) {
        ret.createdAt = ret.createdAt?.getTime();
        ret.updatedAt = ret.updatedAt?.getTime();
        delete ret.__v;
    },
});

//TODO: After write document
UserSessionSchema.pre<IUserSession>("save", async function (next: any) {
    try {
        const _this = this;
        if (_this.isModified("currentAccessToken")) {
            _this.latestAccessedAt = Date.now();
            _this.totalAccessTokenGranted++;
        }
        //TODO: Update time for document
        if (_this.isNew) {
            Object.assign(_this.$locals, { wasNew: _this.isNew });
        } else {
            _this.latestAccessedAt = Date.now();
            _this.totalAccessTokenGranted++;
            // _this.updatedAt = Date.now();
        }

        next();
    } catch (error) {
        logger.error(error);
        throw new Error(error.message);
    }
});

//TODO: Before document created
UserSessionSchema.post<IUserSession>("save", function (this: any) {
    try {
        const _this = this;
        //! This is a document after save
        if (_this?.$locals?.wasNew) {
            //new document
        } else {
            //old document
        }
    } catch (error) {
        throw new Error(error);
    }
});

//TODO: After write document, for updateOne using Upsert
UserSessionSchema.pre<IUserSession>("updateOne", async function (next: any) {
    try {
        const _this = this;
        //TODO: Default status for document
        if (!_this.isNew) {
            //? Cause using updateOne with upsert => default isNew = false
            _this?.set("status", "active");
            _this?.set("latestAccessedAt", Date.now());
            _this?.set(
                "totalAccessTokenGranted",
                _this.totalAccessTokenGranted
                    ? _this.totalAccessTokenGranted++
                    : 1
            );
        } else {
            // _this.updatedAt = Date.now();
        }

        next();
    } catch (error) {
        logger.error(error);
        throw new Error(error.message);
    }
});

//TODO: Log error
UserSessionSchema.post<IUserSession>(
    "save",
    function (error: any, doc: any, next: any) {
        if (process.env.NODE_ENV === "development") {
            logger.log(doc);
        }
        if (error.name === "MongoError" && error.code === 11000)
            next(
                new Error("This user session already exists, please try again")
            );
        else next(error);
    }
);

//TODO: Query
UserSessionSchema.pre<Query<Document, IUserSession, IUserSession>>(
    "findOne",
    async function () {
        // Prints "{ email: 'bill@microsoft.com' }"
        if (process.env.NODE_ENV === "development") {
            logger.log(this.getFilter());
        }
    }
);

// UserSessionSchema.plugin(MongoosePaginate);

// interface Model<T extends Document> extends PaginateModel<T> {}

// Default export
export default model<IUserSession>("UserSession", UserSessionSchema);
