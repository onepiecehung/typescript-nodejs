import mongoose from "mongoose";

import { MONGO } from "@config/service.config";
import { logger } from "@/core/log/logger.mixed";

(mongoose as any).Promise = global.Promise;

class Mongo {
    private url: string = MONGO.DB_URL;
    
    constructor() {
        this.initializeConnect();
    }

    private initializeConnect() {
        mongoose
            .connect(this.url, {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(
                () => {
                    logger.debug(
                        `[ Database =>] Connection to the database successful. ${MONGO.DB_URL} ✅`
                    );
                },
                (err) =>
                    logger.error(
                        `[ Database =>] The connection to the database failed: ${err}. = ${MONGO.DB_URL} ❎`
                    )
            );
    }
}

export default new Mongo();
