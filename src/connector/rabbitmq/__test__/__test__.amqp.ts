import { JOB_NAME } from '../../../config/rabbit.config';
import { logger } from '../../../utils/log/logger.mixed';
import MQ from '../init/index';

const RABBIT: any = new MQ();

RABBIT.consumeData(JOB_NAME.TEST_RABBIT, async (msg: any, channel: any) => {
  try {
    let message = JSON.parse(msg.content.toString());
    logger.info('RABBIT_MQ: ' + message.msg);
    channel.ack(msg);
    return true;
  } catch (error) {
    console.error('TEST_AMQP error');
    console.error(error);
    channel.nack(msg);
    return true;
  }
});
