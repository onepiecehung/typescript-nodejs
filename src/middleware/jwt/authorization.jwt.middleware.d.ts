import { NextFunction, Request, Response } from "express";
export declare function getToken(headers: any): any;
export declare function Authorization(req: Request, res: Response, next: NextFunction): Promise<void | Response<any>>;
