import { Document, Schema } from "mongoose";

export interface IManga extends Document {
    name?: string | any;
    aniListId?: string | any;
    myAnimeListId?: string | any;
    otherName?: {
        romaji?: string;
        english?: string;
        native?: string;
        userPreferred?: string;
    };
    author?: Array<Schema.Types.ObjectId>;
    artist?: Array<Schema.Types.ObjectId>;
    createdBy?: Schema.Types.ObjectId;
    updatedBy?: Schema.Types.ObjectId;
    coverImage?: any;
    bannerImage?: string;
    format?: string;
    countryOfOrigin?: string;
    externalLinks?: Array<string>;
    isAdult?: Boolean;
    averageScore?: number;
    meanScore?: number;
    popularity?: number;
    trending?: number;
    staffs?: Array<string>;
    tags?: Array<string>;
    startDate?: Date;
    endDate?: Date;
    genres?: Array<string>;
    description?: string;
    source?: Array<string>;
    totalChapters?: number;
    totalLikes?: number;
    totalComments?: number;
    totalRating?: number;
    totalViews?: number;
    lastUpdatedChapterAt?: Date;
    status?: string;
}
