import { Server, Socket } from "socket.io";

import { SERVER } from "../../../config/service.config";
import { logger } from "../../../core/log/logger.mixed";
import { EVENT } from "../config/index";

export default class SocketIO {
    server: Server | undefined;
    io: any | undefined;
    ioOn: any | undefined;

    constructor(server: any) {
        this.server = server;
        this.io = require("socket.io")(server);
        this.io.on("connection", (Socket: Socket) => {
            logger.error(`Server socket.io on port ${SERVER.PORT}`);
            Socket.emit(EVENT.TEST, {
                ["Socket.IO"]: `Sender: sent successfully at ${new Date().toLocaleString()}`,
            });
        });
    }
    getIO() {
        return this.io;
    }

    //TODO: Emit event to all client.
    emitter(event: string, data: any) {
        let io = this.getIO();
        io.on();
    }

    attach(io: Server) {
        this.io = io;
        return this;
    }
}
