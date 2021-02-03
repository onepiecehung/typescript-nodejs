import { NextFunction, Request, Response } from "express";
/**
 *
 * @param req
 * @param res
 * @param next
 */
export declare function LoginValidator(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
/**
 *
 * @param req
 * @param res
 * @param next
 */
export declare function RegisterValidator(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
/**
 *
 * @param req
 * @param res
 * @param next
 */
export declare function ChangePasswordValidator(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
