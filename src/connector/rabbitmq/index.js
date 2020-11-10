const RABBIT = require("./init");
const { JOB_NAME } = require("../../config/index");
const logger = require("../../util/logger");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function createQueue() {
  try {
    // await sleep(10000);
    await RABBIT.initChannel();
    RABBIT.initQueue(JOB_NAME.TEST_RABBIT, true);
    RABBIT.initQueue(JOB_NAME.SEND_OTP_REG, true);
    RABBIT.initQueue(JOB_NAME.LIKE_POST, true);
    RABBIT.initQueue(JOB_NAME.UNLIKE_POST, true);
    RABBIT.initQueue(JOB_NAME.SEND_OTP_RESET_PASSWORD, true);
    RABBIT.initQueue(JOB_NAME.CREATE_NEW_SELLER, true);
    RABBIT.initQueue(JOB_NAME.UPDATE_TOTAL_PRODUCT, true);
    RABBIT.initQueue(JOB_NAME.CANCEL_ORDER, true);
    RABBIT.initQueue(JOB_NAME.PURCHASE_PRODUCT, true);
    RABBIT.initQueue(JOB_NAME.CREATE_ORDER_SELLER, true);
    RABBIT.initQueue(JOB_NAME.RETURNS_ORDER, true);
    RABBIT.initQueue(JOB_NAME.EXCHANGE_ORDER, true);
    RABBIT.initQueue(JOB_NAME.UPDATE_TOTAL_CMT_POST, false);
    RABBIT.initQueue(JOB_NAME.UPDATE_TOTAL_CMT_REPLY, false);
    RABBIT.initQueue(JOB_NAME.UPDATE_USERNAME_NICKNAME, true);
    logger.info("AMPQ queue is running...");
  } catch (error) {
    logger.error("AMPQ: createQueue initChannel error:");
    logger.error(error);
  }
}

function createWorkers() {
  RABBIT.initChannel()
    .then(() => {
      require("./channel.rabbit");
      logger.info("AMPQ worker is running...");
    })
    .catch((error) => {
      logger.error("AMPQ: createWorkers initChannel error:");
      logger.error(error);
    });
}

module.exports = {
  createWorkers,
  createQueue,
};
