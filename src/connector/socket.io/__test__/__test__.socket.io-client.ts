import io from "socket.io-client";

import { SERVER } from "../../../config/service.config";
import { logger } from "../../../core/log/logger.mixed";
import { EVENT } from "../config/index";

// const socket = io(`http://localhost:${SERVER.PORT}`);

const socket = io(`http://localhost:${SERVER.PORT}`);
socket.on("connect", function () {});
socket.on(EVENT.TEST, (data: any) => {
    logger.warn(`[Receiver-Socket.io]: ${data["Socket.IO"]}`);
});
socket.on("disconnect", function () {
    logger.info(`Disconnecting socket...`);
});
