import { Document } from 'mongoose';
/**
 * @interface
 */
export interface IResponse extends Document {
    success?: Boolean | null;
    statusCode?: Number | String | any;
    statusMessage?: String | any;
    data?: Object | any;
}
/**
 * @interface
 */
export interface IResponseError extends IResponse {
    success?: Boolean;
    statusCode?: Number | String | any;
    statusMessage?: String | any;
    data?: {
        errorMessage?: String | null;
        request?: String | null;
        method?: String | null;
    };
}
/**
 * @interface
 */
export interface IResponseSuccess extends IResponse {
    success?: Boolean;
    statusCode?: Number | String | any;
    statusMessage?: String | any;
    data?: Object;
}
