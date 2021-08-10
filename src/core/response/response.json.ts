import { Request, Response } from "express";

import {
    IResponse,
    IResponseError,
    IResponseSuccess,
} from "@interfaces/response.interface";
import { logger } from "@/core/log/logger.mixed";
import { MESSAGE_TEXT } from "@/messages/message.response";

/**
 *
 * @param {Response} res
 * @param {Object} data
 * @param {number} statusCode
 * @param {number} statusCodeResponse
 */
export async function responseSuccess(
    res?: Response,
    data?: Object | any,
    statusCode?: number,
    statusCodeResponse?: number
) {
    const _statusCode: number =
        res?.statusCode || statusCode || data?.statusCode || 200;
    const _statusMessage: string = res?.statusMessage || `successful`;
    const _statusCodeResponse: number =
        data?.statusCodeResponse || statusCodeResponse || 10000;
    const _data = data?.statusCodeResponse
        ? deleteElement(data)
        : data
        ? data
        : {};

    const dataResponse: IResponseSuccess = {
        success: true,
        statusCode: _statusCode,
        statusMessage: _statusMessage,
        statusCodeResponse: _statusCodeResponse,
        data: _data,
    } as any;

    // if (process.env.NODE_ENV === `development`) {
    //     logger.info(dataResponse);
    // }

    return res?.status(dataResponse.statusCode).json(dataResponse);
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Object} error
 * @param {number} statusCode
 * @param {number} statusCodeResponse
 */
export async function responseError(
    req?: Request,
    res?: Response,
    error?: Object | any,
    statusCode?: number,
    statusCodeResponse?: number
) {
    const _statusCodeResponse: number =
        statusCodeResponse || error?.statusCodeResponse || 50000;
    const _statusCode: number = error?.statusCode || statusCode || 500;
    const _statusMessage: string = error?.statusMessage || `failure`;
    const _errorMessage: string =
        typeof error === "string"
            ? error
            : error?.message
            ? error?.message
            : MESSAGE_TEXT[_statusCodeResponse] || `bruh...`;

    const dataResponse: IResponseError = {
        success: false,
        statusCode: _statusCode,
        statusMessage: _statusMessage,
        statusCodeResponse: _statusCodeResponse,
        data: {
            errorMessage: _errorMessage,
            request: req?.originalUrl,
            method: req?.method,
        },
    } as any;

    return res?.status(_statusCode).json(dataResponse);
}

function deleteElement(object: any, element?: any) {
    delete object[`${element}`];
    delete object?.statusCode;
    delete object?.statusCodeResponse;
    return object;
}

export function responseWSSuccess(
    data: Object | any,
    statusCode?: number,
    statusMessage: string = "successful",
    statusCodeResponse: number = 10000
): JSON | Object | any {
    const dataResponse: IResponse = {
        success: true,
        statusCode: statusCode
            ? statusCode
            : data?.statusCode
            ? data?.statusCode
            : 200,
        statusMessage: statusMessage,
        statusCodeResponse: statusCodeResponse,
        data: data,
    } as any;
    return dataResponse;
}

export function responseWSError(
    data: Object | any,
    statusCode?: number,
    statusMessage: string = "failure",
    statusCodeResponse: number = 50000
): JSON | Object | any {
    const dataResponse: IResponse = {
        success: false,
        statusCode: statusCode
            ? statusCode
            : data?.statusCode
            ? data?.statusCode
            : 500,
        statusMessage: statusMessage,
        statusCodeResponse: statusCodeResponse,
        data: data,
    } as any;
    return dataResponse;
}
