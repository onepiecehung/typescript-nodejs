const RABBIT = require("../init");
const JOB_NAME = require("../config/index").JOB_NAME
const logger = require("../../../util/logger")

RABBIT.consumeData(JOB_NAME.TEST_RABBIT, async (msg, channel) => {
  try {
    let message = JSON.parse(msg.content.toString());
    logger.info('rabbitmq: ' + message.msg);
    channel.ack(msg);
    return true;
  } catch (error) {
    console.error('TEST_AMQP error');
    console.error(error);
    channel.nack(msg);
    return true;
  }
});
