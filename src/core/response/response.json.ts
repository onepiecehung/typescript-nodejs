import { Request, Response } from "express";

import {
    IResponse,
    IResponseError,
    IResponseSuccess,
} from "@interfaces/response.interface";
import { logger } from "@/core/logger/logger.mixed";

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
    const dataResponse: IResponseSuccess = {
        success: true,
        statusCode: res?.statusCode
            ? res?.statusCode
            : statusCode
            ? statusCode
            : data?.statusCode
            ? data?.statusCode
            : 200,
        statusMessage: res?.statusMessage ? res?.statusMessage : `successful`,
        statusCodeResponse: data?.statusCodeResponse
            ? data?.statusCodeResponse
            : statusCodeResponse || 10000,
        data: data?.statusCodeResponse ? deleteElement(data) : data,
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
    const dataResponse: IResponseError = {
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
            errorMessage:
                typeof error === "string" ? error : error?.message || `bruh...`,
            request: req?.url,
            method: req?.method,
        },
    } as any;

    // if (process.env.NODE_ENV === `development`) {
    //     logger.info(dataResponse);
    // }

    return res?.status(dataResponse.statusCode).json(dataResponse);
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
