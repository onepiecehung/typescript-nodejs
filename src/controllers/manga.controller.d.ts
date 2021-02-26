import { Request, Response } from "express";
export declare function create(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function update(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
