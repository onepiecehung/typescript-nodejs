import dotenv from "dotenv";
import path from "path";

const dotEnvConfigs = {
    path: path.resolve(process.cwd(), ".env"),
};
dotenv.config(dotEnvConfigs);

/**
 * @Initialize Server
 */
import "@bin/server";
/**
 * @Initialize Redis
 */
import "@connector/redis";
/**
 * @Initialize Mongo
 */
import "@connector/mongo/init";
/**
 * @Initialize Socket Server
 */
// import "@connector/socket.io/chat";
/**
 * @Initialize Socket Client
 */
// import "@connector/socket.io/__test__/__test__.socket.io-client";
