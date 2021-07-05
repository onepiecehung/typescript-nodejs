import { JOB_NAME } from "@config/rabbit.config";
import RABBIT from "@connector/rabbitmq/init/index";
import UserSessionRepository from "@repository/userSession.repository";
import { logger } from "@/core/log/logger.mixed";
import { lookup } from "geoip-lite";

RABBIT?.consumeData(
    JOB_NAME.USER_SESSION_WRITE,
    async (msg: any, channel: any) => {
        try {
            const message: any = JSON.parse(msg.content.toString());

            if (process.env.NODE_ENV === "development") {
                logger.debug(message);
            }

            let userSession: any = { ...message };

            userSession = Object.assign(userSession, {
                location: lookup(userSession.ip),
            });

            await UserSessionRepository.create(userSession);
            // await UserSessionRepository.findOneAndUpdateUpsert(
            //     {
            //         userAgent: message?.userAgent,
            //         user: message?.user,
            //         ip: message?.ip,
            //         location: userSession?.location,
            //         status: "active",
            //         // uuid: message?.uuid,
            //     },
            //     userSession
            // );

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
