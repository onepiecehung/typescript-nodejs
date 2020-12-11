import { Request, Response } from "express";
export declare function login(req: Request, res: Response): Promise<Response<any> | undefined>;
export declare function register(req: Request, res: Response): Promise<Response<any> | undefined>;
export declare function getProfile(req: Request, res: Response): Promise<Response<any> | undefined>;
export declare function getAccessToken(req: Request, res: Response): Promise<Response<any> | undefined>;
