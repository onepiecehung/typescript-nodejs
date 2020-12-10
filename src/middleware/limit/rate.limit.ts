import { Request, Response } from "express";
import RateLimit from "express-rate-limit";
import { v4 } from "public-ip";
import RedisStore from "rate-limit-redis";

import { init } from "../../connector/redis/index";
import { IResponseError } from "../../interfaces/response.interface";

export const apiLimiter = RateLimit({
    store: new RedisStore({
        client: init(),
    }),
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100,
    handler: async function (req: Request, res: Response) {
        const DataResponse: IResponseError = {
            success: false,
            statusCode: 429,
            statusMessage: `failure`,
            statusCodeResponse: 50000,
            data: {
                errorMessage: `Your IP: ${await v4()} has been blocked, cause you sent too many requests, please try again after in a minute`,
                request: req?.url,
                method: req?.method,
            },
        } as any;
        res.status(DataResponse.statusCode).json(DataResponse);
    },
});
