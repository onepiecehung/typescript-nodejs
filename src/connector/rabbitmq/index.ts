import MQ from "./init/index";
import { JOB_NAME } from "../../config/rabbit.config";
import { logger } from "../../utils/log/logger.mixed";

const RABBIT: any = new MQ();



export async function createQueue() {
	try {
		await RABBIT.initChannel();
		RABBIT.initQueue(JOB_NAME.TEST_RABBIT, true);
		logger.info("AMPQ queue is running...");
	} catch (error) {
		logger.error("AMPQ: createQueue initChannel error:");
		logger.error(error);
	}
}

export async function createWorkers() {
	RABBIT.initChannel()
		.then(() => {
			require("./__test__/__test__.amqp");
			logger.info("AMPQ worker is running...");
		})
		.catch((error: any) => {
			logger.error("AMPQ: createWorkers initChannel error:");
			logger.error(error);
		});
}

