import dotenv from "dotenv";
import path from "path";

const dotEnvConfigs = {
    path: path.resolve(process.cwd(), ".env"),
};
dotenv.config(dotEnvConfigs);

import "../connector/mongo/init/index";
import { createQueue, createWorkers } from "../connector/rabbitmq/index";
import { testAMQP } from "../connector/rabbitmq/__test__/__test__.worker";

createQueue()
    .then(() => {
        setTimeout(() => {
            createWorkers(), testAMQP();
        }, 3000);
    })
    .catch((error) => {
        console.log("Error init rabbit : ", error);
    });
