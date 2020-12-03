import { NextFunction, Request, Response } from "express";
export declare function LoginValidator(req: Request, res: Response, next: NextFunction): Promise<Response<any> | undefined>;
export declare function RegisterValidator(req: Request, res: Response, next: NextFunction): Promise<Response<any> | undefined>;
