import { JOB_NAME } from '../../../config/rabbit.config';
import MQ from '../init/index';

const RABBIT: any = new MQ();
export function testAMQP() {
  RABBIT.sendDataToRabbit(JOB_NAME.TEST_RABBIT, { msg: `[RABBIT] Test ampq success: ${new Date().toISOString()}` });
}

