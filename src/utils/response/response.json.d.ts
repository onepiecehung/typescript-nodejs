import { Request, Response } from "express";
/**
 *
 * @param {Response} res
 * @param {Object} data
 * @param {Number} statusCode
 * @param {Number} statusCodeResponse
 */
export declare function responseSuccess(res?: Response, data?: Object | any, statusCode?: Number, statusCodeResponse?: Number): Promise<Response<any, Record<string, any>> | undefined>;
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Object} error
 * @param {Number} statusCode
 * @param {Number} statusCodeResponse
 */
export declare function responseError(req?: Request, res?: Response, error?: Object | any, statusCode?: Number, statusCodeResponse?: Number): Promise<Response<any, Record<string, any>> | undefined>;
