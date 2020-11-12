const winston = require("winston");

const levels: Object = {
    value: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3,
        verbose: 4,
        silly: 5,
        combined: 6,
        morgan: 7
    },
    colors: {
        error: "red",
        warn: "red",
        info: "red",
        debug: "red",
        verbose: "red",
        silly: "red",
        combined: "red",
        morgan: "red",
    }
} as Object;
const myFormat = winston.format.printf(({ levels, message, timestamp }: { levels: any, message: any, timestamp: any }) => `${timestamp} ${levels}: ${message}`);

const logger: any = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
        winston.format.colorize(),
        myFormat),
    transports: [
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
        new winston.transports.File({
            filename: "logs/warn.log",
            level: "warn",
        }),
        new winston.transports.File({
            filename: "logs/info.log",
            level: "info",
        }),
        new winston.transports.File({
            filename: "logs/debug.log",
            level: "debug",
        }),
        new winston.transports.File({
            filename: "logs/verbose.log",
            level: "verbose",
        }),
        new winston.transports.File({
            filename: "logs/silly.log",
            level: "silly",
        }),
        new winston.transports.File({
            filename: "logs/combined.log",
            level: "combined",
        }),
        new winston.transports.File({
            filename: "logs/morgan.log",
            level: "warn",
        }),
    ],
});

// Write log to console when run on mode is not production
if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            level: levels,
            timestamp: function () {
                return new Date().toISOString();
            },
            format: winston.format.simple(),
        })
    );
}

logger.stream = {
    write: function (message: any, encoding: any) {
        logger.warn(message);
    },
};


export default logger;