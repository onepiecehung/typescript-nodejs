import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import logger from 'morgan';

import api from './routes/bin/api.version.1.0.0.routes';

const app: Application = express();

app.use(cors());

app.use(logger("dev"));
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
        res.status(err.status || 500);
        res.send("Error occurred while handling the request.");
    });
} else {
    // Log stack trace of error message while in development
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        // const DataResponse:Object|any = {
        //     statusCode: err.statusCode || 500,
        //     success: false,
        //     data: {
        //         error: err.message || `bruh`,
        //         request: req.originalUrl,
        //         method: req.method,
        //     },
        // };
        // return res.status(DataResponse.status).json(DataResponse);
    });
}

export default app;
