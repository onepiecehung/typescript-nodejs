import { Request, Response } from 'express';

import { IResponseError, IResponseSuccess } from '../../interface/response.interface';

export async function responseSuccess(res?: Response, data?: Object | any, statusCode?: Number) {
    const DataResponse: IResponseSuccess = {
        success: true,
        statusCode: res?.statusCode ? res?.statusCode : statusCode ? statusCode : 200,
        statusMessage: res?.statusMessage ? res?.statusMessage : `Success`,
        data: data
    } as any;

    return res?.status(DataResponse.statusCode).json(DataResponse);
}


export async function responseError(req?: Request, res?: Response, error?: Object | any, statusCode?: Number) {
    const DataResponse: IResponseError = {
        success: false,
        statusCode: error?.status ? error?.status : statusCode ? statusCode : 500,
        statusMessage: error?.statusMessage ? error?.statusMessage : `Failed`,
        data: {
            errorMessage: error?.message || `Bruh`,
            request: req?.url,
            method: req?.method,
        }
    } as any;
    return res?.status(DataResponse.statusCode).json(DataResponse);
}