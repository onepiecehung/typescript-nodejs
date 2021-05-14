import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import promBundle from "express-prom-bundle"; // https://www.npmjs.com/package/express-prom-bundle
import helmet from "helmet";
import createError from "http-errors";
import morgan from "morgan";
import { v4 } from "public-ip";
import UAParser from "ua-parser-js";
import { v4 as uuidv4 } from "uuid";

import APIVersion from "@/routes/rest/bin/APIVersion.1.0.0.routes";
import { testAMQP } from "@connector/rabbitmq/__test__/__test__.worker";
import { createQueue } from "@connector/rabbitmq/index";
import logger from "@core/log/logger.winston";
import { responseError } from "@core/response/response.json";
import { logs } from "@middleware/logger/logger.middleware";
import graphql from "@routes/graphql/api.version.1.0.0.routes";

class App {
    public app: Application;
    private metricsMiddleware = promBundle({
        buckets: [0.1, 0.4, 0.7],
        includeMethod: true,
        includePath: true,
        customLabels: { year: null },
        transformLabels: (labels) =>
            Object.assign(labels, { year: new Date().getFullYear() }),
        metricsPath: "/metrics",
        promClient: {
            collectDefaultMetrics: {},
        },
        urlValueParser: {
            minHexLength: 5,
            extraMasks: [
                "^[0-9]+\\.[0-9]+\\.[0-9]+$", // replace dot-separated dates with #val
            ],
        },
        normalizePath: [
            ["^/foo", "/example"], // replace /foo with /example
        ],
    });

    constructor() {
        this.app = express();

        this.initializeWorker();
        this.initializeMiddleware();
        this.initializeWriteLogs();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    /**
     * getServer
     */
    public getServer() {
        return this.app;
    }

    private initializeMiddleware() {
        // TODO: Log to file when running on production
        if (process.env.NODE_ENV === "production") {
            this.app.use(morgan("combined", { stream: logger.stream }));
            // TODO: set up cors
            this.app.use(
                cors({ origin: "your.domain.com", credentials: true })
            );
        } else {
            this.app.use(morgan("dev"));
            // TODO: set up cors
            this.app.use(cors({ origin: true, credentials: true }));
        }
        /**
         * todo: https://www.npmjs.com/package/express-prom-bundle
         */
        this.app.use(this.metricsMiddleware);

        /**
         * todo: setup helmet
         * Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
         * Helmet is actually just a collection of smaller middleware functions that set security-related HTTP response headers:
         */
        this.app.use(helmet());

        /**
         * todo: Use gzip compression
         */
        this.app.use(compression());

        // TODO: Setup for get IP, for reverse proxy
        this.app.set("trust proxy", true);

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    private initializeWriteLogs() {
        this.app.use(
            async (req: Request, res: Response, next: NextFunction) => {
                Object.assign(
                    res.locals,
                    {
                        userAgent: new UAParser(req.headers["user-agent"]),
                    },
                    {
                        ip:
                            (await v4()) ||
                            req.headers["x-forwarded-for"] ||
                            req.ip ||
                            req.ips ||
                            req.headers["x-real-ip"],
                    },
                    { uuid: uuidv4() }
                );
                next();
            },
            logs
        );
    }

    private initializeRoutes() {
        const { router: rest } = new APIVersion();

        this.app.use("/rest", rest);
        this.app.use("/graphql", graphql);
    }

    private initializeErrorHandling() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            next(createError(404));
        });

        this.app.use(
            (err: any, req: Request, res: Response, next: NextFunction) => {
                return responseError(req, res, err);
            }
        );
    }

    private initializeWorker() {
        // TODO: Running worker
        createQueue()
            .then(() => {
                setTimeout(() => {
                    testAMQP();
                }, 5000);
            })
            .catch((error) => {
                logger.error("Error init rabbit : ", error);
            });
    }
}

export default App;
