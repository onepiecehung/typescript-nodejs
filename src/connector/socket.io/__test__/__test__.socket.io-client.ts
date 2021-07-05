// import axios from "axios";
import { io } from "socket.io-client";

import { SERVER } from "../../../config/service.config";
import { logger } from "../../../core/log/logger.mixed";
import { EVENT } from "../config/index";

// const socket = io(`http://localhost:${SERVER.PORT}`);

class SocketIOClient {
    // accessToken: string;
    // refreshToken: string;
    user: any;
    // socket: typeof io;

    constructor() {
        // setTimeout(() => {
        //     this.login(process.env.TEST_USER, process.env.TEST_PASS).then(
        //         (response) => {
        //             this.user = response.data;
        //             console.log(this.user);
        //         }
        //     );
        // }, 1000);
        // console.log(this.user);
    }

    // async login(id: any, pass: any) {
    //     try {
    //         const user = await axios({
    //             method: "POST",
    //             url: `http://localhost:${SERVER.PORT}/rest/v1/users/login`,
    //             data: {
    //                 id: id,
    //                 password: pass,
    //             },
    //         });
    //         return user.data;
    //     } catch (error) {
    //         return error.message;
    //     }
    // }
}

const socket = io(`ws://localhost:${SERVER.WS_PORT}/user`, {
    path: "/ws/ws",
    auth: {
        token:
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUyYmFkZGU4YWEyOTBjMDg1YmYyMGQiLCJpcCI6IjE0LjI0MS4yMjUuMSIsInV1aWQiOiI4OGIzODUwZC0xMTI3LTQ4ZTEtYmU5ZC0zNmEyZTRiOThjNWIiLCJpYXQiOjE2MTYwMzQ1MzUsImV4cCI6MTYxNjAzODEzNX0.9Ha8MTZfPJJVELXNPrKqviF6KoOXQiZsYbFw5RPt5l3OYRL259WvZzyVl3zrEPqkFjHY4j5bfljv_InLg0AyRA",
    },
    // reconnectionDelay: 1000,
    // reconnection: true,
    // reconnectionAttempts: 10,
    transports: ["websocket"],
    // agent: false, // [2] Please don't set this to true
    // upgrade: false,
    // rejectUnauthorized: false,
});

socket.on("connect", () => {
    console.log(socket.connected);
});

socket.on(EVENT.TEST, (data: any, callback: any) => {
    logger.warn(`[Receiver-Socket.io]: ${data["Socket.IO"]}`);
    // callback({
    //     status: "ok",
    // });
});

socket.on(EVENT.INIT, (data: any) => {
    logger.warn(`[Receiver-Socket.io]: ${data.data}`);
});

socket.on("disconnect", () => {
    console.log(socket.connected);
    logger.info(`Disconnecting socket...`);
});

setInterval(() => {
    socket.emit("hello", "Hi,Hello", (response: any) => {
        console.log(response.date);
    });
    // socket.emit(EVENT.MESSAGE, "Hi");
}, 2000);

// client - side;
socket.on("connect_error", (error: any) => {
    // if (JSON.parse(error.message)) {
    //     logger.error(JSON.parse(error.message)); // prints the message associated with the error
    // }
    logger.error(error.message);
});

// export default new SocketIOClient();
