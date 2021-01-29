import { lookup } from "geoip-lite";
import jwt from "jsonwebtoken";

import { PRIVATE_KEY_ACCESS } from "../config/jwt.config";
import { JOB_NAME } from "../config/rabbit.config";
import RABBIT from "../connector/rabbitmq/init/index";
import * as LogAPIRepository from "../repository/logAPI.repository";
import { logger } from "../utils/log/logger.mixed";

RABBIT?.consumeData(JOB_NAME.LOG_ACTION, async (msg: any, channel: any) => {
    try {
        let message: any = JSON.parse(msg.content.toString());

        delete message?.body?.password;

        let level: number = 0;

        switch (message.method) {
            case "PATCH":
            case "PUT":
                level = 1;
                break;
            case "POST":
            case "DELETE":
                level = 2;
                break;

            default:
                break;
        }

        if (process.env.NODE_ENV === "development") {
            logger.debug(message);
        }

        if (message.token) {
            message.token = jwt.verify(message.token, PRIVATE_KEY_ACCESS);
        }
        let location = lookup(message.ip);

        await LogAPIRepository.create(
            Object.assign(message, {
                location: location,
                level: level,
            })
        );

        logger.warn(`Write log API success`);

        channel.ack(msg);

        return true;
    } catch (error) {
        logger.error(`Write log API failed`);
        logger.error(error);
        channel.nack(msg);
        return false;
    }
});
