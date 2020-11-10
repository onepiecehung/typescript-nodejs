const Redis = require("ioredis");
const { REDIS } = require("../../config/index");


let client;
const timeEX = 120;
function init() {
    if (!client) {
        //default connect redis localhost:3306
        client = new Redis(REDIS.URL_REDIS);
        client.on("error", (err) => {
            console.log(`Connect to Redis fail, you need install redis or start service redis`.red.bold);
            console.error(err);
        });
        client.on("connect", () => {
            console.log(`Connect to Redis success: ${client.options.host}:${client.options.port}`.cyan.bold);
        })
        client.on("ready", () => {
            console.log(`========== STATUS REDIS SERVER ==========`.red.bold);
            console.log("Redis version: " + client.serverInfo.redis_version);
            console.log("OS running: " + client.serverInfo.os);
            console.log("Uptime: " + client.serverInfo.uptime_in_seconds + "s");
            console.log(`================== END ==================`.red.bold);
        })
        return client;
    } else {
        console.log(`Connect to Redis success`.cyan.bold);
        return client;
    }
}

client = init();


async function setJson(key, value, time) {
    if (!time) {
        time = timeEX;
    }
    value = JSON.stringify(value);
    return client.set(key, value, "EX", time);
}

async function getJson(key) {
    let data = await client.get(key);
    if (data) data = JSON.parse(data);
    return data;
}

async function deleteKey(key) {
    return await client.del(key)
}

module.exports = {
    setJson,
    getJson,
    deleteKey
};
