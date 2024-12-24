import redis from "redis";

let client: any;

const redisClient = async () => {
    if (!client) {
        client = await redis.createClient({
            url: process.env.REDIS_URL
        }).on("error", (err) => {
            console.error("Redis error:", err);
        }).connect();
    }
    return 
};

const setKey = async (key: string, value: any, ttl: number | null = null) => {
    if (!client) await redisClient();
    value = JSON.stringify(value);
    if (ttl) {
        await client.set(key, value, "EX", ttl);
    } else {
        await client.set(key, value);
    }
};

const getKey = async (key: string) => {
    if (!client) await redisClient();
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
};

const delKey = async (key: string) => {
    if (!client) await redisClient();
    await client.del(key);
};

export { setKey, getKey, delKey };