import dotenv from "dotenv";
import path from "path";

const dotEnvConfigs = {
    path: path.resolve(process.cwd(), ".env"),
};
dotenv.config(dotEnvConfigs);

import "./server";
import "../connector/redis/index";
import "../connector/mongo/init/index";
import "../connector/socket.io/__test__/__test__.socket.io-client";
