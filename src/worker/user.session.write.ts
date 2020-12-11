import { JOB_NAME } from "../config/rabbit.config";
import RABBIT from "../connector/rabbitmq/init/index";
import * as UserSessionRepository from "../repository/user.session.repository";
import { logger } from "../utils/log/logger.mixed";
import { lookup } from "geoip-lite";

RABBIT?.consumeData(
    JOB_NAME.USER_SESSION_WRITE,
    async (msg: any, channel: any) => {
        try {
            let message: any = JSON.parse(msg.content.toString());

            if (process.env.NODE_ENV === "development") {
                logger.debug(message);
            }

            let userSession: any = { ...message };

            userSession = Object.assign(userSession, {
                location: lookup(userSession.ip),
            });

            await UserSessionRepository.findOneAndUpdateUpsert(
                {
                    userAgent: message?.userAgent,
                    user: message?.user,
                    ip: message?.ip,
                    location: userSession?.location,
                    status: "active",
                },
                userSession
            );

            logger.warn(`Write user session success`);

            channel.ack(msg);

            return true;
        } catch (error) {
            logger.error(`Write session failed`);
            logger.error(error);
            channel.nack(msg);
            return false;
        }
    }
);
