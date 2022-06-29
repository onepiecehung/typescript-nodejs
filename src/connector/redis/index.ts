import Redis from "ioredis";

import { REDIS } from "../../config/service.config";
import { logger } from "../../core/log/logger.mixed";

class CRedis {
    public client: any;
    private timeEX: number;
    private redisUrl: string;

    constructor() {
        this.timeEX = 120;
        this.redisUrl = REDIS.REDIS_URL;
        this.client = this.initializeRedis();
    }

    /**
     * initializeRedis
     */
    public initializeRedis() {
        let client = this.client;
        if (!client) {
            // default connect redis localhost:3306
            client = new Redis(this.redisUrl);
            client.on("error", (err: any) => {
                logger.error(
                    `Connect to Redis fail, you need install redis or start service redis`
                );
                logger.error(err);
            });
            client.on("connect", () => {
                logger.log(
                    `Connect to Redis success: ${client.options.host}:${client.options.port}`
                );
            });
            client.on("ready", () => {
                logger.log(`========== STATUS REDIS SERVER ==========`);
                logger.log("Redis version: " + client.serverInfo.redis_version);
                logger.log("Redis mode: " + client.serverInfo.redis_mode);
                logger.log("OS running: " + client.serverInfo.os);
                logger.log("Uptime: " + client.serverInfo.uptime_in_days + "d");
                logger.info("Time: " + `${new Date().toLocaleString()}`);
                logger.log(`================== END ==================`);
            });
            // TODO: Deletes all keys from the connection's current database
            // client.flushdb();
            return client;
        } else {
            logger.warn(`Waiting to connect to Redis...`);
            return client;
        }
    }

    public async setJson(key: string, value: any, time?: number) {
        if (!time) {
            time = this.timeEX;
        }
        value = JSON.stringify(value);
        return this.client.set(key, value, "EX", time);
    }

    public async getJson(key: string) {
        let data: any = await this.client.get(key);
        if (data) data = JSON.parse(data);
        return data;
    }

    public async deleteKey(key: String) {
        return await this.client.del(key);
    }

    public async flushdb() {
        return await this.client.flushdb();
    }
}

export default new CRedis();
