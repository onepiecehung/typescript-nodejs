import dotenv from "dotenv";
import path from "path";

const dotEnvConfigs = {
    path: path.resolve(process.cwd(), ".env"),
};
dotenv.config(dotEnvConfigs);

/**
 * @Initialize Server
 */
import "../bin/server";
/**
 * @Initialize Redis
 */
import "../connector/redis/index";
/**
 * @Initialize Mongo
 */
import "../connector/mongo/init";
