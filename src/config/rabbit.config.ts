export const JOB_NAME = {
    TEST_RABBIT: "TEST_RABBIT",
    GO_TEST_RABBIT: "GO_TEST_RABBIT",
    USER_SESSION_WRITE: "USER_SESSION_WRITE",
    ACCESS_TOKEN_FROM_NEW_LOCATION: "ACCESS_TOKEN_FROM_NEW_LOCATION",
    LOG_ACTION: "LOG_ACTION",
};

export const SUB_NAME = {
    S_TEST_RABBIT: "S_TEST_RABBIT",
};

/**
 * @param RABBIT
 * @param RABBIT.URL
 */
//! https://stackoverflow.com/questions/26229031/amqp-connection-closed-certain-time-interval-with-node-js/26300084
//! https://github.com/squaremo/amqp.node/issues/151
//! https://stackoverflow.com/questions/18315863/node-jsnode-amqp-js-cant-connect-to-activemq-either-61616-or-5672-ports
//! https://stackoverflow.com/questions/33905915/what-causes-amqp-node-to-get-econnreset-from-a-rabbitmq-server

export const RABBIT_URL =
    process.env.RABBIT_URL || `amqp://guest:guest@localhost:5672?heartbeat=45`; //! https://www.rabbitmq.com/heartbeats.html
