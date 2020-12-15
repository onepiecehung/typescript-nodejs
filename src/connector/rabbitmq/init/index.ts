import * as amqp from "amqplib";

import { RABBIT_URL } from "../../../config/rabbit.config";
import { logger } from "../../../utils/log/logger.mixed";

class RABBIT {
    channel: any;
    queues: any;

    constructor() {
        this.channel = null;
        this.queues = {};
    }

    initChannel() {
        return new Promise((resolve, reject) => {
            let channel = this.channel;
            if (channel) {
                return resolve(channel);
            }
            //! Connect to RabbitMQ
            amqp.connect(RABBIT_URL, {
                timeout: 30000,
            })
                .then(async (conn) => {
                    // Create channel
                    logger.trace(`Successfully connected to: ${RABBIT_URL}`);
                    channel = await conn.createChannel();
                    this.channel = channel;
                    return resolve(channel);
                })
                .catch((error) => {
                    logger.error(
                        "AMQP connection failed, please check it carefully:"
                    );
                    logger.error(error);
                    return reject(error);
                });
        });
    }

    getChannel() {
        return this.channel;
    }

    initQueue(queueName: any, durable: Boolean) {
        let channel;
        try {
            channel = this.getChannel();
        } catch (error) {
            logger.error("initQueue error:");
            logger.error(error);
            throw error;
        }

        if (!this.queues[queueName]) {
            this.queues[queueName] = channel?.assertQueue(queueName, {
                durable: durable,
            });
        }

        return this.queues[queueName];
    }

    async sendDataToRabbit(queueName: any, data: any) {
        if (!data || !(typeof data === "object" || typeof data === "string")) {
            throw Error("Data must be object or string");
        }
        if (typeof data === "object") {
            data = JSON.stringify(data);
        }
        try {
            // Convert data to Binary type before send it to Queue
            if (!this.channel) {
                await this.initChannel();
            }
            return this.channel?.sendToQueue(queueName, Buffer.from(data), {
                persistent: true,
            });
        } catch (error) {
            // Do your stuff to handle this error
            logger.error("sendDataToRabbit error:");
            logger.error(error);
            throw error;
        }
    }

    /**
     *
     * @param queueName
     * @param callback
     * @param options
     * @param options.noAck, if need to make sure the message proceed let set noAck = false
     */
    consumeData(queueName: any, callback: any, options?: any) {
        class settings {
            options: any;
            noAck: any;
            constructor() {
                this.options = options;
                this.noAck = (options && options.noAck) || false;
            }
        }
        let setting = new settings();
        if (!queueName) {
            throw new Error("You must implement queueName in consumer child");
        }
        this.channel?.consume(
            queueName,
            (msg: any) => {
                callback(msg, this.channel);
            },
            {
                noAck: setting.noAck,
            }
        );
    }
}

export default new RABBIT();
