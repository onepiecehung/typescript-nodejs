export const JOB_NAME = {
    TEST_RABBIT: "TEST_RABBIT",
    USER_SESSION_WRITE: "USER_SESSION_WRITE",
};

/**
 * @param RABBIT
 * @param RABBIT.URL
 */

export const RABBIT_URL =
    process.env.RABBIT_URL || `amqp://ds112:ds112@127.0.0.1:5672/`;
