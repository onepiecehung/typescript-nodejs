import { Request, Response } from 'express';
export declare function responseSuccess(res?: Response, data?: Object | any, statusCode?: Number): Promise<Response<any> | undefined>;
export declare function responseError(req?: Request, res?: Response, error?: Object | any, statusCode?: Number): Promise<Response<any> | undefined>;
