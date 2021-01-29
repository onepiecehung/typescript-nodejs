import { Document } from "mongoose";

export interface ILogAPI extends Document {
    originalUrl?: string | any;
    method?: string | any;
    hostname?: string | any;
    httpVersion?: string | any;
    protocol?: string | any;
    level?: Number | any;
    userAgent?: JSON | Object | any | null;
    body?: JSON | Object | any | null;
    query?: JSON | Object | any | null;
    ip?: string | any;
    user?: string | any;
    location?: string | any;
    createdAt?: number | Date | string | null;
    updatedAt?: number | Date | string | null;
}
