// import WS from "../init";
// import { EVENT } from "../config";
// import { Socket } from "socket.io";

// // setInterval(() => {
// //     WS.emitEvent(EVENT.INIT, { data: 123 });
// // }, 1000);

// setInterval(() => {
//     // console.log(WS.socket.id);
//     // console.log(WS.socket.handshake.user);
//     // console.log(WS.namespace.listeners("connection"));
// }, 3000);

// // WS.socket.on(EVENT.MESSAGE, (data: any) => {
// //     console.log(2);
// //     console.log(data);
// // });

// // WS.onListenEvent(EVENT.MESSAGE, (data: any) => {
// //     console.log(data);
// // });

// setTimeout(() => {
//     WS.onListenEvent(EVENT.MESSAGE, (data: any) => {
//         console.log(data);
//     });
//     // WS.onListenEvent("hello", (data: any, callback: any) => {
//     //     console.log(data);
//     //     callback({
//     //         date: `ohh, got it ${new Date().toLocaleString()}`,
//     //     });
//     // });
//     console.log(WS.socket?.handshake?.user, WS.socket?.handshake?.token);
// }, 1000);
