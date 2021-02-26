import { Request, Response } from "express";

import { logger } from "../core/log/logger.mixed";
import { responseError, responseSuccess } from "../core/response/response.json";
import * as MangaService from "../services/manga.service";

export async function create(req: Request, res: Response) {
    try {
        let data: any = await MangaService.create(req.body, res.locals);
        return responseSuccess(res, data, 200);
    } catch (error) {
        logger.error(error);
        return responseError(req, res, error);
    }
}
export async function update(req: Request, res: Response) {
    try {
        let data: any = await MangaService.create(req.body, res.locals);
        return responseSuccess(res, data, 200);
    } catch (error) {
        logger.error(error);
        return responseError(req, res, error);
    }
}
