import { Request, Response } from "express";
import RateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";

import { init } from "../../connector/redis/index";
import { IResponseError } from "../../interfaces/response.interface";

export const apiLimiter = RateLimit({
    store: new RedisStore({
        client: init(),
    }),
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10,
    handler: function (req: Request, res: Response) {
        const DataResponse: IResponseError = {
            success: false,
            statusCode: 429,
            statusMessage: `failure`,
            statusCodeResponse: 50000,
            data: {
                errorMessage: `Your IP has been blocked, cause you sent too many requests`,
                request: req?.url,
                method: req?.method,
            },
        } as any;
        res.status(DataResponse.statusCode).json(DataResponse);
    },
});
