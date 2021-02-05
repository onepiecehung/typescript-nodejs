import { JOB_NAME } from "../config/rabbit.config";
import RABBIT from "../connector/rabbitmq/init/index";
// import * as UserSessionRepository from "../repository/user.session.repository";
import { logger } from "../core/log/logger.mixed";

RABBIT?.consumeData(
    JOB_NAME.ACCESS_TOKEN_FROM_NEW_LOCATION,
    async (msg: any, channel: any) => {
        try {
            let message: any = JSON.parse(msg.content.toString());

            if (process.env.NODE_ENV === "development") {
                logger.debug(message);
            }

            logger.warn(`Sent email to {user} success [Not yet setup mail]`);

            channel.ack(msg);

            return true;
        } catch (error) {
            logger.error(`Sent email to {user} fail`);
            logger.error(error);
            channel.nack(msg);
            return false;
        }
    }
);
