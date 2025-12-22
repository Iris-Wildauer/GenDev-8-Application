import { getRedis } from './redis';

export async function getUserWidgetPriorities(userId: string): Promise<Record<string, number>> {
    try {
        const redis = getRedis();
        const cached = await redis.get(`widgetPriorities:${userId}`);
        if (cached) {
            return JSON.parse(cached) as Record<string, number>;
        }
        return {};
    } catch (error) {
        console.error(`[Redis] Error loading priorities for ${userId}:`, error);
        return {};
    }
}


export async function setUserWidgetPriorities(
    userId: string,
    priorities: Record<string, number>
): Promise<void> {
    try {
        const redis = getRedis();
        await redis.setex(
            `widgetPriorities:${userId}`,
            7 * 24 * 3600,
            JSON.stringify(priorities)
        );
        console.log(`[Redis] Saved priorities for ${userId}:`, priorities);
    } catch (error) {
        console.error(`[Redis] Error saving priorities for ${userId}:`, error);
        throw error;
    }
}

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

export async function invalidateCache(key: string): Promise<void> {
    const redis = getRedis();
    try {
        await redis.del(key);

        const userId = key.split(':')[1];
        if (userId) {
            const patterns = [
                `preferences:${userId}`,
                `widgets:${userId}`,
                `user:${userId}`
            ];

            for (const pattern of patterns) {
                const keys = await redis.keys(pattern);
                if (keys.length > 0) {
                    await redis.del(keys);
                }
            }
        }

        console.log(`Invalidated cache: ${key}`);
    } catch (error) {
        console.error(error);
    }
}
