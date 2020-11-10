import { Document } from "mongoose";


export interface IResponseSuccess extends Document {
    statusCode?: Number | String | any;
    statusText?: String | any;
    iRequest?: {
        request?: String | null,
        method?: String | null,
    };
    data?: Object | any;
}


export interface IResponseError extends IResponseSuccess {
    statusCode?: Number | String | any;
    statusText?: String | any;
    iRequest?: {
        request?: String | null,
        method?: String | null,
    };
}

