import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import createError from "http-errors";
import morgan from "morgan";

import { testAMQP } from "./connector/rabbitmq/__test__/__test__.worker";
import { createQueue } from "./connector/rabbitmq/index";
import graphql from "./routes/graphql/api.version.1.0.0.routes";
import rest from "./routes/rest/bin/api.version.1.0.0.routes";
import logger from "./utils/log/logger.winston";
import { responseError } from "./utils/response/response.json";
import { log } from "./middleware/logger/logger.middleware";

//TODO: Running worker
createQueue()
    .then(() => {
        setTimeout(() => {
            testAMQP();
        }, 5000);
    })
    .catch((error) => {
        console.error("Error init rabbit : ", error);
    });

const app: Application = express();

/**
 * todo: setup helmet
 * Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
 * Helmet is actually just a collection of smaller middleware functions that set security-related HTTP response headers:
 */
app.use(helmet());

/**
 * todo: Use gzip compression
 */
app.use(compression());

app.set("trust proxy", true); //TODO: Setup for get IP, for reverse proxy

app.use(cors()); //TODO: set up cors

app.use(morgan("dev"));

//TODO: Log to file when running on production
if (process.env.NODE_ENV === "production") {
    app.use(morgan("combined", { stream: logger.stream }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// todo: log to db
app.use("*", log);

// TODO setup router
app.use("/rest", rest);
app.use("/graphql", graphql);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
});

// TODO Web Template Studio: Add your own error handler here.
// if (process.env.NODE_ENV === "production") {
//     // Do not send stack trace of error message when in production
//     app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//         return responseError(req, res, err);
//     });
// } else {
//     // Log stack trace of error message while in development
//     app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//         return responseError(req, res, err);
//     });
// }

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    return responseError(req, res, err);
});

export default app;
