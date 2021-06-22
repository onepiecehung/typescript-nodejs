import { Document } from "mongoose";

/**
 * @interface
 */
export interface IResponse extends Document {
    success?: Boolean | null;
    statusCode?: number | string | any;
    statusMessage?: string | any;
    data?: Object | any;
}

/**
 * @interface
 */
export interface IResponseError extends IResponse {
    success?: Boolean;
    statusCode?: number | string | any;
    statusMessage?: string | any;
    data?: {
        errorMessage?: string | null;
        request?: string | null;
        method?: string | null;
    };
}

/**
 * @interface
 */

export interface IResponseSuccess extends IResponse {
    success?: Boolean;
    statusCode?: number | string | any;
    statusMessage?: string | any;
    data?: Object;
}
