import { Server } from "socket.io";
export default class SocketIO {
    server: Server | undefined;
    io: any | undefined;
    ioOn: any | undefined;
    constructor(server: any);
    getIO(): any;
    emitter(event: string, data: any): void;
    attach(io: Server): this;
}
