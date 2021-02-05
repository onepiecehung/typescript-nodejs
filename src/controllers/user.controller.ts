import { Request, Response } from "express";

import * as UserService from "../services/user.service";
import { logger } from "../core/log/logger.mixed";
import { responseError, responseSuccess } from "../core/response/response.json";

export async function login(req: Request, res: Response) {
    try {
        let data: any = await UserService.login(req.body, res.locals);
        return responseSuccess(res, data, 200);
    } catch (error) {
        logger.error(error);
        return responseError(req, res, error);
    }
}

export async function register(req: Request, res: Response) {
    try {
        let data: any = await UserService.register(req.body);
        return responseSuccess(res, data, 201);
    } catch (error) {
        logger.error(error);
        return responseError(req, res, error);
    }
}

export async function getProfile(req: Request, res: Response) {
    try {
        return responseSuccess(res, res.locals?.user, 200);
    } catch (error) {
        logger.error(error);
        return responseError(req, res, error);
    }
}

export async function getAccessToken(req: Request, res: Response) {
    try {
        let data: any = await UserService.getAccessToken(res.locals);
        return responseSuccess(res, data, 200);
    } catch (error) {
        logger.error(error);
        return responseError(req, res, error);
    }
}

export async function logout(req: Request, res: Response) {
    try {
        let data: any = await UserService.logout(res.locals?.token);
        return responseSuccess(res, data, 200);
    } catch (error) {
        logger.error(error);
        return responseError(req, res, error);
    }
}

export async function changePassword(req: Request, res: Response) {
    try {
        let data: any = await UserService.changePassword(
            res.locals?.user,
            req.body
        );
        return responseSuccess(res, data, 200);
    } catch (error) {
        logger.error(error);
        return responseError(req, res, error);
    }
}
