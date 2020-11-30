import { Request, Response } from "express";

import {
    IResponseError,
    IResponseSuccess,
} from "../../interfaces/response.interface";

export async function responseSuccess(
    res?: Response,
    data?: Object | any,
    statusCode?: Number,
    statusCodeResponse?: Number
) {
    const DataResponse: IResponseSuccess = {
        success: true,
        statusCode: res?.statusCode
            ? res?.statusCode
            : statusCode
            ? statusCode
            : 200,
        statusCodeResponse: statusCodeResponse || 10000,
        statusMessage: res?.statusMessage ? res?.statusMessage : `success`,
        data: data,
    } as any;

    return res?.status(DataResponse.statusCode).json(DataResponse);
}

export async function responseError(
    req?: Request,
    res?: Response,
    error?: Object | any,
    statusCode?: Number,
    statusCodeResponse?: Number
) {
    const DataResponse: IResponseError = {
        success: false,
        statusCode: error?.status
            ? error?.status
            : statusCode
            ? statusCode
            : 500,
        statusCodeResponse: statusCodeResponse || 50000,
        statusMessage: error?.statusMessage ? error?.statusMessage : `failure`,
        data: {
            errorMessage: error?.message || `bruh...`,
            request: req?.url,
            method: req?.method,
        },
    } as any;
    return res?.status(DataResponse.statusCode).json(DataResponse);
}
