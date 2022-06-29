// import { RedisClient } from "redis";
// import { Namespace, Server, Socket } from "socket.io";
// import { createAdapter } from "socket.io-redis";

// import { SERVER } from "../../../config/service.config";
// import { logger } from "../../../core/log/logger.mixed";
// import {
//     responseWSError,
//     responseWSSuccess,
// } from "../../../core/response/response.json";
// import { AuthenticationWebSocket } from "../../../middleware/jwt/auth.jwt.middleware";
// import { EVENT } from "../config";

// type TNamespace = {
//     test: string;
//     user: string;
// };
// class SocketIO {
//     server: Server | undefined;
//     socket: Socket | any;
//     names: TNamespace = { test: "test", user: "user" };
//     namespace: Namespace;
//     io: any;
//     pubClient: RedisClient;
//     subClient: RedisClient;

//     constructor() {
//         // TODO: new server running port
//         this.io = new Server(parseInt(SERVER.WS_PORT), {
//             path: "/ws",
//         });

//         // !important: if you use redis-cluster: https://github.com/socketio/socket.io-redis#with-ioredis-client
//         // TODO: setup pub/sub
//         this.pubClient = new RedisClient({
//             url: process.env.REDIS_URL_WS || "redis://127.0.0.1:6379/6",
//             tls: null,
//         });
//         this.subClient = this.pubClient.duplicate();

//         // TODO: setup adapter
//         this.io.adapter(
//             createAdapter({
//                 pubClient: this.pubClient,
//                 subClient: this.subClient,
//             })
//         );
//         // TODO: setup nsp
//         this.namespace = this.getNamespace();

//         // TODO: The errors emitted from pubClient and subClient will also be forwarded to the adapter instance:
//         this.getNamespace().adapter.on("error", (error: any) => {
//             console.log(error);
//         });

//         // TODO: setup middleware
//         this.setMiddleware(async (socket: Socket | any, next: any) => {
//             try {
//                 // await AuthenticationWebSocket(socket, next);
//                 next();
//             } catch (error) {
//                 error = responseWSError({ message: error }, 403);
//                 socket.disconnect(true);
//                 next(new Error(JSON.stringify(error)));
//             }
//         });

//         // TODO: setup socket
//         this.socket = this.getSocket();

//         setTimeout(() => {
//             // console.log(this.getSocket().local);
//             // console.log(this.socket.handshake?.user);
//             this.emitEvent(EVENT.TEST, {
//                 ["Socket.IO"]: `Sender: sent successfully at ${new Date().toLocaleString()}`,
//             });
//         }, 5000);

//         // server-side
//         // this.io.of(this.names.user).on("connection", (socket: Socket) => {
//         //     socket.on("hello", (arg: any) => {
//         //         console.log(arg); // world
//         //     });
//         // });
//         // setTimeout(() => {
//         //     this.onListenEvent(EVENT.MESSAGE, (data: any) => {
//         //         console.log(data);
//         //     });
//         // }, 1000);

//         logger.error(`Server socket.io on port ${SERVER.WS_PORT}`);
//     }

//     getPubClient(): RedisClient {
//         return this.pubClient;
//     }

//     getSubClient(): RedisClient {
//         return this.subClient;
//     }

//     subEvent(eventName: string): void {
//         this.subClient?.subscribe(eventName);
//     }

//     pubEvent(eventName: string, data: any): void {
//         this.pubClient?.publish(eventName, data);
//     }

//     setMiddleware(callback: any): void {
//         this.namespace.use((socket: Socket, next: any) => {
//             callback(socket, next);
//         });
//     }
//     // TODO: setup nsp
//     //  this.namespace = this.io.of(this.names.user);
//     getNamespace(namespace: string = this.names.user): Namespace | any {
//         const nsp = this.namespace;
//         if (nsp) {
//             return this.namespace;
//         }
//         this.namespace = this.io.of(namespace);
//         return this.namespace;
//     }

//     getSocket(listenName: string = "connection"): Socket {
//         const ws = this.socket;
//         if (ws) {
//             return this.socket;
//         }

//         return this.getNamespace().on(listenName, (socket: Socket) => {
//             this.socket = socket;
//             return this.socket;
//         });
//     }

//     onListenEvent(eventName: string, callback: any): void {
//         if (!this.socket) {
//             this.socket = this.getSocket();
//         }

//         this.socket.on(eventName, (arg: any) => {
//             callback(arg, callback);
//         });
//     }

//     // sending to the client
//     emitEvent(eventName: string, data: JSON | Object): void {
//         try {
//             this.getSocket()?.emit(eventName, data);
//         } catch (error) {
//             logger.error(error);
//             this.getSocket()?.emit(eventName, error);
//         }
//     }

//     broadcastEmitEvent(eventName: string, data: JSON | Object): void {
//         try {
//             this.io.broadcast?.emit(eventName, data);
//         } catch (error) {
//             this.io.broadcast?.emit(eventName, error);
//         }
//     }
// }

// export default new SocketIO();
