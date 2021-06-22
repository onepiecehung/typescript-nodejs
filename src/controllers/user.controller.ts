import { Request, Response } from "express";

import UserService from "@services/user.service";
import { logger } from "@/core/logger/logger.mixed";
import { responseError, responseSuccess } from "@core/response/response.json";

export default new (class UserController {
    constructor() {}
    public async login(req: Request, res: Response) {
        try {
            const data: any = await UserService.login(req.body, res.locals);
            return responseSuccess(res, data, 200);
        } catch (error) {
            logger.error(error);
            return responseError(req, res, error);
        }
    }

    public async register(req: Request, res: Response) {
        try {
            const data: any = await UserService.register(req.body);
            return responseSuccess(res, data, 201);
        } catch (error) {
            logger.error(error);
            return responseError(req, res, error);
        }
    }

    public async getProfile(req: Request, res: Response) {
        try {
            return responseSuccess(res, res.locals?.user, 200);
        } catch (error) {
            logger.error(error);
            return responseError(req, res, error);
        }
    }

    public async getAccessToken(req: Request, res: Response) {
        try {
            const data: any = await UserService.getAccessToken(res.locals);
            return responseSuccess(res, data, 200);
        } catch (error) {
            logger.error(error);
            return responseError(req, res, error);
        }
    }

    public async logout(req: Request, res: Response) {
        try {
            const data: any = await UserService.logout(res.locals?.token);
            return responseSuccess(res, data, 200);
        } catch (error) {
            logger.error(error);
            return responseError(req, res, error);
        }
    }

    public async changePassword(req: Request, res: Response) {
        try {
            const data: any = await UserService.changePassword(
                res.locals?.user,
                req.body
            );
            return responseSuccess(res, data, 200);
        } catch (error) {
            logger.error(error);
            return responseError(req, res, error);
        }
    }
})();
