import dotenv from "dotenv";
import path from "path";

const dotEnvConfigs = {
    path: path.resolve(process.cwd(), ".env"),
};
dotenv.config(dotEnvConfigs);

import "@bin/server";
import "@connector/redis";
import "@connector/mongo/init";
// import "@connector/socket.io/chat";
// import "@connector/socket.io/__test__/__test__.socket.io-client";
