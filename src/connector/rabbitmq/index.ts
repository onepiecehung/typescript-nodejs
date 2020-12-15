import { JOB_NAME } from "../../config/rabbit.config";
import { logger } from "../../utils/log/logger.mixed";
import RABBIT from "./init/index";

export async function createQueue() {
    try {
        await RABBIT.initChannel();
        RABBIT.initQueue(JOB_NAME.TEST_RABBIT, true);
        RABBIT.initQueue(JOB_NAME.USER_SESSION_WRITE, true);
        RABBIT.initQueue(JOB_NAME.ACCESS_TOKEN_FROM_NEW_LOCATION, false);
        logger.log("⌛ ⌛ ⌛ AMQP queue is running...");
    } catch (error) {
        logger.error("AMQP: createQueue initChannel error:");
        logger.error(error);
    }
}

export function createWorkers() {
    RABBIT.initChannel()
        .then(() => {
            require("./channel.rabbit");
            logger.debug("⚔️  AMQP worker is running...");
        })
        .catch((error) => {
            logger.error("AMQP: createWorkers initChannel error:");
            logger.error(error);
        });
}
