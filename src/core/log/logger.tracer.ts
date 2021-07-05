import tracer from 'tracer';

const logger: any = tracer.colorConsole();
// interface
type TLog = 'log' | 'trace' | 'debug' | 'info' | 'warn' | 'error';

/**
 * Log data
 * @param text message
 * @param shop shop domain
 */
const log = (text: string, type: TLog = 'log'): void => {
    logger[type](text);
};

export default log;
