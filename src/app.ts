import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import morgan from 'morgan';

import api from './routes/bin/api.version.1.0.0.routes';
import logger from './utils/log/logger.winston';
import { responseError } from './utils/response/response.json';

const app: Application = express();

app.use(cors());

app.use(morgan("dev"));
app.use(morgan("combined", { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// TODO setup subdomain, router
app.use("/v1", api);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
});

// TODO Web Template Studio: Add your own error handler here.
if (process.env.NODE_ENV === "production") {
    // Do not send stack trace of error message when in production
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        return responseError(req, res, err);
    });
} else {
    // Log stack trace of error message while in development
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        return responseError(req, res, err);
    });
}

export default app;
