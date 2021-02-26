import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { logger } from "../core/log/logger.mixed";
import { responseError } from "../core/response/response.json";

import { MANGA_FORMAT } from "../config/manga.config";

const CreateMangaValidationSchema = Joi.object({
    name: Joi.string().required(),
    otherName: Joi.object({
        romaji: Joi.string().allow(""),
        english: Joi.string().allow(""),
        native: Joi.string().allow(""),
        userPreferred: Joi.string().allow(""),
    }),
    author: Joi.string().allow(""),
    artist: Joi.string().allow(""),
    createdBy: Joi.string().allow(""),
    updatedBy: Joi.string().allow(""),
    coverImage: Joi.string().allow(""),
    bannerImage: Joi.string().allow(""),
    format: Joi.string().valid(...Object.values(MANGA_FORMAT)),
    countryOfOrigin: Joi.string().required(),
    externalLinks: Joi.array().allow(""),
    isAdult: Joi.boolean().default(false).allow(""),
    staffs: Joi.array().allow(""),
    tags: Joi.array().allow(""),
    startDate: Joi.date().allow(""),
    endDate: Joi.date().allow(""),
    genres: Joi.array().allow(),
    description: Joi.string().required(),
    source: Joi.array().allow(""),
});

const UpdateMangaValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    otherName: Joi.object({
        romaji: Joi.string().allow(""),
        english: Joi.string().allow(""),
        native: Joi.string().allow(""),
        userPreferred: Joi.string().allow(""),
    }),
    author: Joi.string().allow(""),
    artist: Joi.string().allow(""),
    createdBy: Joi.string().allow(""),
    updatedBy: Joi.string().allow(""),
    coverImage: Joi.string().allow(""),
    bannerImage: Joi.string().allow(""),
    format: Joi.string().valid(...Object.values(MANGA_FORMAT)),
    countryOfOrigin: Joi.string().required(),
    externalLinks: Joi.array().allow(""),
    isAdult: Joi.boolean().default(false).allow(""),
    staffs: Joi.array().allow(""),
    tags: Joi.array().allow(""),
    startDate: Joi.date().allow(""),
    endDate: Joi.date().allow(""),
    genres: Joi.array().allow(),
    description: Joi.string().required(),
    source: Joi.array().allow(""),
});

/**
 *
 * @param req
 * @param res
 * @param next
 */
export async function CreateMangaValidator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        await CreateMangaValidationSchema.validateAsync(req.body);
        next();
    } catch (error) {
        logger.error(error);
        return responseError(req, res, error, 412);
    }
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
export async function UpdateMangaValidator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        await UpdateMangaValidationSchema.validateAsync(req.body);
        next();
    } catch (error) {
        logger.error(error);
        return responseError(req, res, error, 412);
    }
}
