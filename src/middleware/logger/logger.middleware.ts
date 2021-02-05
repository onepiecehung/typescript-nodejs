import { NextFunction, Request, Response } from "express";
import { v4 } from "public-ip";
import UAParser from "ua-parser-js";

import { JOB_NAME } from "../../config/rabbit.config";
import RABBIT from "../../connector/rabbitmq/init/index";
import { logger } from "../../core/log/logger.mixed";
import { getToken } from "../jwt/auth.jwt.middleware";

export async function log(req: Request, res: Response, next: NextFunction) {
    try {
        let userAgent = new UAParser(req.headers["user-agent"]);
        let ip = await v4();

        let payload: JSON | any = {
            method: req.method,
            httpVersion: req.httpVersion,
            hostname: req.hostname,
            originalUrl: req.originalUrl,
            protocol: req.protocol,
            ip: ip,
            token: getToken(req.headers),
            userAgent: userAgent.getResult(),
            body: req.body,
            query: req.query,
        };
        RABBIT.sendDataToRabbit(JOB_NAME.LOG_ACTION, payload);
        if (process.env.NODE_ENV == "development") {
            logger.info(payload);
        }
        next();
    } catch (error) {
        logger.error(error);
        next();
    }
}
