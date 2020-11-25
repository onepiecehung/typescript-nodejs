import { JOB_NAME } from '../config/index';
import RABBIT from '../init/index';
import { logger } from "../../../utils/log/logger.mixed";

export function testAMQP() {
	logger.info(`[Sender]: Start sending the message to RabbitMQ...`)
	RABBIT.sendDataToRabbit(JOB_NAME.TEST_RABBIT, { msg: `[RABBIT] Test AMQP success: ${new Date().toISOString()}` });
}
