import { Request, Response } from "express";

import {
    IResponseError,
    IResponseSuccess,
} from "../../interfaces/response.interface";
import { logger } from "../log/logger.mixed";

/**
 *
 * @param {Response} res
 * @param {Object} data
 * @param {Number} statusCode
 * @param {Number} statusCodeResponse
 */
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
            : data?.statusCode
            ? data?.statusCode
            : 200,
        statusMessage: res?.statusMessage ? res?.statusMessage : `success`,
        statusCodeResponse: data?.statusCodeResponse
            ? data?.statusCodeResponse
            : statusCodeResponse || 10000,
        data: data?.statusCodeResponse ? deleteElement(data) : data,
    } as any;

    if (process.env.NODE_ENV === `development`) {
        logger.info(DataResponse);
    }

    return res?.status(DataResponse.statusCode).json(DataResponse);
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Object} error
 * @param {Number} statusCode
 * @param {Number} statusCodeResponse
 */
export async function responseError(
    req?: Request,
    res?: Response,
    error?: Object | any,
    statusCode?: Number,
    statusCodeResponse?: Number
) {
    const DataResponse: IResponseError = {
        success: false,
        statusCode: error?.statusCode
            ? error?.statusCode
            : statusCode
            ? statusCode
            : 500,
        statusMessage: error?.statusMessage ? error?.statusMessage : `failure`,
        statusCodeResponse:
            statusCodeResponse || error?.statusCodeResponse || 50000,
        data: {
            errorMessage: error?.message || `bruh...`,
            request: req?.url,
            method: req?.method,
        },
    } as any;

    if (process.env.NODE_ENV === `development`) {
        logger.info(DataResponse);
    }

    return res?.status(DataResponse.statusCode).json(DataResponse);
}

function deleteElement(object: any, element?: any) {
    delete object[`${element}`];
    delete object?.statusCode;
    delete object?.statusCodeResponse;
    return object;
}
