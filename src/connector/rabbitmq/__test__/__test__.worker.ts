import { JOB_NAME } from "../../../config/rabbit.config";
import RABBIT from "../init/index";
import { logger } from "../../../core/log/logger.mixed";

export function testAMQP() {
    logger.info(`[Sender]: Start sending the message to RabbitMQ...`);
    RABBIT.sendDataToRabbit(JOB_NAME.TEST_RABBIT, {
        msg: `[Rabbit] Test AMQP success: ${new Date().toISOString()}`,
    });
    RABBIT.sendDataToRabbit(JOB_NAME.GO_TEST_RABBIT, {
        msg: `[Rabbit to Go] Test AMQP success: ${new Date().toISOString()}`,
    });
}
