// import admin from "./init/index";

// /**
//  *
//  * @param {Array} registrationTokens
//  * @param {String} topic
//  */
// export function subscribeToTopic(registrationTokens: any, topic: any) {
//     try {
//         admin
//             .messaging()
//             .subscribeToTopic(registrationTokens, topic)
//             .then((response: any) => {
//                 // See the MessagingTopicManagementResponse reference documentation
//                 // for the contents of response.
//                 console.log("Successfully subscribed to topic:", response);
//                 return true;
//             })
//             .catch((error: any) => {
//                 console.log("Error subscribing to topic:", error);
//                 return false;
//             });
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// }

// export function unsubscribeFromTopic(registrationTokens: any, topic: any) {
//     try {
//         admin
//             .messaging()
//             .unsubscribeFromTopic(registrationTokens, topic)
//             .then((response: any) => {
//                 // See the MessagingTopicManagementResponse reference documentation
//                 // for the contents of response.
//                 console.log("Successfully unsubscribed from topic:", response);
//                 return true;
//             })
//             .catch((error: any) => {
//                 console.log("Error unsubscribing from topic:", error);
//                 return false;
//             });
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// }

// export function sendMessageToTopic(data: any, topic: any) {
//     try {
//         const message: any = Object.assign(data, { topic: topic });
//         admin
//             .messaging()
//             .send(message)
//             .then((response: any) => {
//                 // Response is a message ID string.
//                 console.log("Successfully sent message:", response);
//                 return true;
//             })
//             .catch((error: any) => {
//                 console.log("Error sending message:", error);
//                 return false;
//             });
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// }

// export function sendToDevice(
//     registrationToken: any,
//     payload: any,
//     options?: any
// ) {
//     try {
//         if (!options) {
//             options = {
//                 priority: "high",
//                 timeToLive: 60 * 60,
//             };
//         }
//         admin
//             .messaging()
//             .sendToDevice(registrationToken, payload, options)
//             .then((response: any) => {
//                 // Response is a message ID string.
//                 console.log("Successfully sent message:", response);
//                 return true;
//             })
//             .catch((error: any) => {
//                 console.log("Error sending message:", error);
//                 return false;
//             });
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// }
