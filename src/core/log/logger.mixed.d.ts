export declare const logger: any;
declare type TLog = 'log' | 'trace' | 'debug' | 'info' | 'warn' | 'error';
/**
 * Log data
 * @param text message
 * @param shop shop domain
 */
declare const log: (text: string, type?: TLog) => void;
export default log;
