import { Document, model, Query, Schema } from "mongoose";
// import MongoosePaginate from "mongoose-paginate-v2";

import { ILogAPI } from "../interfaces/logAPI.interface";
import { logger } from "../core/log/logger.mixed";
import User from "./user.model";

const LogAPISchema: Schema = new Schema(
    {
        originalUrl: {
            type: Schema.Types.String,
            default: "Unknown",
        },
        method: {
            type: Schema.Types.String,
            default: "GET",
        },
        hostname: {
            type: Schema.Types.String,
            default: "127.0.0.1",
        },
        httpVersion: {
            type: Schema.Types.String,
        },
        protocol: {
            type: Schema.Types.String,
        },
        level: {
            type: Schema.Types.Number,
            default: 0,
        },
        userAgent: {
            type: Schema.Types.Mixed,
            required: true,
        },
        body: {
            type: Schema.Types.Mixed,
            default: { data: "empty" },
        },
        query: {
            type: Schema.Types.Mixed,
            default: { data: "empty" },
        },
        ip: {
            type: Schema.Types.String,
            default: "0.0.0.0/32",
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: User,
            default: null,
        },
        location: {
            type: Schema.Types.Mixed,
        },
        closingTimeMs: {
            type: Schema.Types.String,
            default: null,
        },
        isClosingTime: {
            type: Schema.Types.Boolean,
            default: false,
        },
        finishedTimeMs: {
            type: Schema.Types.String,
            default: null,
        },
        isFinishedTime: {
            type: Schema.Types.Boolean,
            default: false,
        },
        uuid: {
            type: Schema.Types.String,
            default: null,
        },
    },
    {
        timestamps: true,
        collection: "LogAPIs",
    }
);

LogAPISchema.set("toJSON", {
    transform: function (doc: any, ret: any) {
        delete ret.__v;
    },
});

LogAPISchema.set("toObject", {
    transform: function (doc: any, ret: any) {
        delete ret.__v;
    },
});

LogAPISchema.pre<ILogAPI>("save", async function (next: any) {
    try {
        const _this = this;

        //TODO: Update time for document
        if (_this.isNew) {
            Object.assign(_this.$locals, { wasNew: _this.isNew });
            // _this.$locals.wasNew = _this.isNew;
            // _this.createdAt = Date.now();
            // _this.updatedAt = Date.now();
        } else {
            // _this.updatedAt = Date.now();
        }

        next();
    } catch (error) {
        logger.error(error);
        throw new Error(error.message);
    }
});

LogAPISchema.post<ILogAPI>("save", function (this: any) {
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

//TODO: Log error
LogAPISchema.post<ILogAPI>("save", function (error: any, doc: any, next: any) {
    if (process.env.NODE_ENV === "development") {
        logger.log(doc);
    }
    if (error.name === "MongoError" && error.code === 11000)
        next(new Error("This document already exists, please try again"));
    else next(error);
});

//TODO: Query
LogAPISchema.pre<Query<Document, ILogAPI, ILogAPI>>(
    "findOne",
    async function () {
        // Prints "{ email: 'bill@microsoft.com' }"
        if (process.env.NODE_ENV === "development") {
            logger.log(this.getFilter());
        }
    }
);

//Set up PaginateModel
// LogAPISchema.plugin(MongoosePaginate);

// interface Model<T extends Document> extends PaginateModel<T> {}

// Default export
export default model<ILogAPI>("LogAPI", LogAPISchema);
