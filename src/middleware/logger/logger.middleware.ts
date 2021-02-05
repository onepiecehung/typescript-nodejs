import { NextFunction, Request, Response } from "express";
import { v4 } from "public-ip";
import UAParser from "ua-parser-js";
import { v4 as uuidv4 } from "uuid";

import { JOB_NAME } from "../../config/rabbit.config";
import RABBIT from "../../connector/rabbitmq/init/index";
import { logger } from "../../core/log/logger.mixed";
import { getToken } from "../jwt/auth.jwt.middleware";

export async function log(req: Request, res: Response, next: NextFunction) {
    try {
        Object.assign(res.locals, { uuid: uuidv4() });
        let start = process.hrtime();
        let userAgent = new UAParser(req.headers["user-agent"]).getResult();
        let ip = await v4();
        let token = getToken(req.headers);

        let payload: JSON | any = {
            method: req.method,
            httpVersion: req.httpVersion,
            hostname: req.hostname,
            originalUrl: req.originalUrl,
            protocol: req.protocol,
            ip: ip,
            token: token,
            userAgent: userAgent,
            body: req.body,
            query: req.query,
        };

        const getDurationInMilliseconds = (start: any) => {
            let NS_PER_SEC = 1e9;
            let NS_TO_MS = 1e6;
            let diff = process.hrtime(start);

            return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
        };

        res.on("finish", () => {
            Object.assign(payload, {
                finishedTimeMs: getDurationInMilliseconds(start),
                isFinishedTime: true,
                uuid: res.locals.uuid,
            });
            RABBIT.sendDataToRabbit(JOB_NAME.LOG_ACTION, payload);

            if (process.env.NODE_ENV == "development") {
                logger.info(payload);
            }
        });

        res.on("close", () => {
            Object.assign(payload, {
                closingTimeMs: getDurationInMilliseconds(start),
                isClosingTime: true,
                uuid: res.locals.uuid,
            });
            RABBIT.sendDataToRabbit(JOB_NAME.LOG_ACTION, payload);

            if (process.env.NODE_ENV == "development") {
                logger.info(payload);
            }
        });

        next();
    } catch (error) {
        logger.error(error);
        next();
    }
}
