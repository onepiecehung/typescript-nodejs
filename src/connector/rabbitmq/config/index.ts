export const JOB_NAME = {
    TEST_RABBIT: "TEST_RABBIT",
};

/**
 * @param RABBIT
 * @param RABBIT.URL
 */

export const RABBIT_URL =
    process.env.RABBIT_URL || `amqp://guest:guest@localhost:5672`;
