import { JOB_NAME, SUB_NAME } from "../../config/rabbit.config";
import { logger } from "../../core/log/logger.mixed";
import RABBIT from "./init/index";

export async function createQueue() {
    try {
        await RABBIT.initChannel();
        RABBIT.initQueue(JOB_NAME.TEST_RABBIT, true);
        RABBIT.initQueue(JOB_NAME.GO_TEST_RABBIT, true);
        RABBIT.initQueue(JOB_NAME.USER_SESSION_WRITE, true);
        RABBIT.initQueue(JOB_NAME.ACCESS_TOKEN_FROM_NEW_LOCATION, false);
        RABBIT.initQueue(JOB_NAME.LOG_ACTION, false);
        
        // TODO: This for subscription 
        RABBIT.initExchange(SUB_NAME.S_TEST_RABBIT, true);
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
