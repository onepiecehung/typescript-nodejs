import mongoose from 'mongoose';

import { MONGO } from '../../../config/service.config';
import { logger } from '../../../utils/log/logger.mixed';

mongoose.Promise = global.Promise;

mongoose
    .connect(MONGO.DB_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(
        () => {
            logger.debug(`[ Database =>] Connection to the database successful. ${MONGO.DB_URL} ✅`);
        },
        err => logger.error(`[ Database =>] The connection to the database failed: ${err}. = ${MONGO.DB_URL} ❎`)
    );