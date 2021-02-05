import { JOB_NAME } from "../config/index";
import RABBIT from "../init/index";
import { logger } from "../../../core/log/logger.mixed";

RABBIT?.consumeData(JOB_NAME.TEST_RABBIT, async (msg: any, channel: any) => {
    try {
        let message = JSON.parse(msg.content.toString());
        logger.warn("[Receiver]", " RabbitMQ: " + message.msg);
        channel.ack(msg);
        return true;
    } catch (error) {
        console.error("TEST_AMQP error");
        console.error(error);
        channel.nack(msg);
        return true;
    }
});
