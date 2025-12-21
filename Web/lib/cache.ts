import { getRedis } from './redis';

export async function getCached<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl: number = 300
): Promise<T> {
    const redis = getRedis();

    const cached = await redis.get(key);
    if (cached) {
        console.log(`[HIT] ${key}`);
        return JSON.parse(cached);
    }
    console.log(`[MISS] ${key}`);
    const data = await fetchFn();

    await redis.setex(key, ttl, JSON.stringify(data));

    return data;
}