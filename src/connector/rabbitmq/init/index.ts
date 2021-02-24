import * as amqp from "amqplib";

import { RABBIT_URL } from "../../../config/rabbit.config";
import { logger } from "../../../core/log/logger.mixed";

class RABBIT {
    channel: any;
    queues: any;
    subscriptions: any;

    constructor() {
        this.channel = null;
        this.queues = {};
        this.subscriptions = {};
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
            logger.error("initQueue error: ", error);
            throw error;
        }

        if (!this.queues[queueName]) {
            this.queues[queueName] = channel?.assertQueue(queueName, {
                durable: durable,
            });
        }

        return this.queues[queueName];
    }

    initExchange(subscriptionName: any, durable: Boolean) {
        let channel;
        try {
            channel = this.getChannel();
        } catch (error) {
            logger.error("initExchange error: ", error);
            throw error;
        }

        if (!this.subscriptions[subscriptionName]) {
            this.subscriptions[subscriptionName] = channel?.assertExchange(
                subscriptionName,
                "fanout",
                {
                    durable: durable,
                }
            );
        }

        return this.subscriptions[subscriptionName];
    }

    // TODO: Work Queues, Distributing tasks among workers (the competing consumers pattern)
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

    // TODO: Publish/Subscribe , Sending messages to many consumers at once
    async publishToRabbit(subscriptionName: any, data: any) {
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
            return this.channel?.publish(subscriptionName, Buffer.from(data), {
                persistent: true,
            });
        } catch (error) {
            // Do your stuff to handle this error
            logger.error("publishToRabbit error:");
            logger.error(error);
            throw error;
        }
    }

    subscribe(subscriptionName: any, callback: any, options?: any) {
        class settings {
            options: any;
            noAck: any;
            constructor() {
                this.options = options;
                this.noAck = (options && options.noAck) || false;
            }
        }
        let setting = new settings();
        if (!subscriptionName) {
            throw new Error("You must implement queueName in consumer child");
        }

        const _this = this;

        this.channel?.assertQueue(
            "",
            {
                exclusive: true,
            },
            (error: any, q: any) => {
                if (error) {
                    throw new Error(error);
                }
                _this.channel?.bindQueue(q.queue, subscriptionName, "");
                _this.channel?.consume(
                    subscriptionName,
                    (msg: any) => {
                        callback(msg, _this.channel);
                    },
                    {
                        noAck: setting.noAck,
                    }
                );
            }
        );
    }
}

export default new RABBIT();
