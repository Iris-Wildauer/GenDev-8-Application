import Redis from 'ioredis';

let client: Redis | null = null;

export function getRedis(): Redis {
    if (!client) {
        client = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
            maxRetriesPerRequest: 3,
            enableReadyCheck: true,
            lazyConnect: false
        });

        client.on('error', (err) => console.error('Redis Error:', err));
        client.on('connect', () => console.log('Redis connected'));
    }

    return client;
}