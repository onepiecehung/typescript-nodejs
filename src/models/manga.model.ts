import { Document, model, PaginateModel, Query, Schema } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";

import { STATUS } from "../config/manga.config";
import { logger } from "../core/log/logger.mixed";
import { IManga } from "../interfaces/manga.interface";

const MangaSchema: Schema = new Schema(
    {
        name: {
            type: Schema.Types.String,
            required: true,
        },
        aniListId: {
            type: Schema.Types.String,
        },
        myAnimeListId: {
            type: Schema.Types.String,
        },
        otherName: {
            romaji: {
                type: Schema.Types.String,
            },
            english: {
                type: Schema.Types.String,
            },
            native: {
                type: Schema.Types.String,
            },
            userPreferred: {
                type: Schema.Types.String,
            },
        },
        author: {
            type: Schema.Types.ObjectId,
        },
        artist: {
            type: Schema.Types.ObjectId,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
        },
        coverImage: {
            type: Schema.Types.String,
        },
        bannerImage: {
            type: Schema.Types.String,
        },
        format: {
            type: Schema.Types.String,
        },
        countryOfOrigin: {
            type: Schema.Types.String,
            default: "JP",
        },
        externalLinks: {
            type: [Schema.Types.String],
        },
        isAdult: {
            type: Schema.Types.Boolean,
            default: false,
        },
        averageScore: {
            type: Schema.Types.Number,
        },
        meanScore: {
            type: Schema.Types.Number,
        },
        popularity: {
            type: Schema.Types.Number,
        },
        trending: {
            type: Schema.Types.Number,
        },
        staffs: {
            type: [Schema.Types.String],
        },
        tags: {
            type: [Schema.Types.String],
        },
        startDate: {
            type: Schema.Types.Date,
        },
        endDate: {
            type: Schema.Types.Date,
        },
        genres: {
            type: [Schema.Types.String],
        },
        description: {
            type: Schema.Types.String,
        },
        source: {
            type: [Schema.Types.String],
        },
        totalChapters: {
            type: Schema.Types.Number,
        },
        totalLikes: {
            type: Schema.Types.Number,
        },
        totalComments: {
            type: Schema.Types.Number,
        },
        totalRating: {
            type: Schema.Types.Number,
        },
        totalViews: {
            type: Schema.Types.Number,
        },
        lastUpdatedChapterAt: {
            type: Schema.Types.Date,
        },
        status: {
            type: Schema.Types.String,
            enum: Object.values(STATUS),
            default: STATUS.ACTIVE,
        },
    },
    {
        timestamps: true,
        collection: "Manga",
    }
);

MangaSchema.set("toJSON", {
    transform: function (doc: any, ret: any) {
        ret.createdAt = ret.createdAt?.getTime();
        ret.updatedAt = ret.updatedAt?.getTime();
        delete ret.status;
        delete ret.__v;
    },
});

MangaSchema.set("toObject", {
    transform: function (doc: any, ret: any) {
        ret.createdAt = ret.createdAt?.getTime();
        ret.updatedAt = ret.updatedAt?.getTime();
        delete ret.status;
        delete ret.__v;
    },
});

// TODO: create new index
MangaSchema.index({ "$**": "text" });

// TODO: Virtual
// MangaSchema.virtual("fullName").get(function (this: IUserBaseDocument) {
//     return `${this.firstName} ${this.lastName}`;
// });

//TODO: Methods
// UserSchema.methods.getGender = function (this: IUserBaseDocument) {
//     return this.gender > 0 ? "Male" : "Female";
// };

MangaSchema.pre<IManga>("save", async function (next: any) {
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

MangaSchema.post<IManga>("save", function (this: any) {
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
MangaSchema.post<IManga>("save", function (error: any, doc: any, next: any) {
    if (process.env.NODE_ENV === "development") {
        logger.log(doc);
    }
    if (error.name === "MongoError" && error.code === 11000)
        next(new Error("This document already exists, please try again"));
    else next(error);
});

//TODO: Query
MangaSchema.pre<Query<Document, IManga, IManga>>("findOne", async function () {
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

//Set up PaginateModel
MangaSchema.plugin(MongoosePaginate);

interface Model<T extends Document> extends PaginateModel<T> {}

// Default export
export default model<IManga>("Manga", MangaSchema);
