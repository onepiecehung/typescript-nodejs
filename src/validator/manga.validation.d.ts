import { NextFunction, Request, Response } from "express";
/**
 *
 * @param req
 * @param res
 * @param next
 */
export declare function CreateMangaValidator(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
/**
 *
 * @param req
 * @param res
 * @param next
 */
export declare function UpdateMangaValidator(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
