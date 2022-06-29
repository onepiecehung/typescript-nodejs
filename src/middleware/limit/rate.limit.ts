import { Request, Response } from "express";
import RateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import RedisClient from "ioredis";
import Redis from "../../connector/redis/index";
import { IResponseError } from "../../interfaces/response.interface";

// Create a `ioredis` client
const client = new RedisClient(process.env.REDIS_URL);

export const apiLimiter = RateLimit({
    store: new RedisStore({
        // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
        sendCommand: (...args: string[]) => client.call(...args),
    }),
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100,
    handler: async (req: Request, res: Response) => {
        const DataResponse: IResponseError = {
            success: false,
            statusCode: 429,
            statusMessage: `failure`,
            statusCodeResponse: 50000,
            data: {
                errorMessage: `Your IP has been blocked, cause you sent too many requests, please try again after in a minute`,
                request: req?.url,
                method: req?.method,
            },
        } as any;
        res.status(DataResponse.statusCode).json(DataResponse);
    },
});
