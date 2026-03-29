const redis = require('redis');

class RedisCache {
	constructor(host, port) {
		this.client = redis.createClient({
			port,
			host,
		});

		this.client.on('error', (err) => console.log('Redis Client Error', err));

		// this.client.on('error', (err) => console.log('Redis Server Error', err));
	}
	async connect() {
		return this.client.connect();
	}

	// Method to add a key-value pair to the cache with an optional TTL in seconds
	set(key, value, ttl = null) {
		if (!this.client.isReady) return;

		if (ttl) {
			return this.client.setEx(key, ttl, JSON.stringify(value));
		} else {
			return this.client.set(key, JSON.stringify(value));
		}
	}

	// Method to retrieve a value from the cache
	async get(key) {
		if (!this.client.isReady) return;
		const value = await this.client.get(key);
		return JSON.parse(value);
	}

	// Method to remove a key-value pair from the cache
	delete(key) {
		if (!this.client.isReady) return;
		return this.client.del(key);
	}

	async getOrSet(key, fn, ttl) {
		try {
			const cachedValue = await redisCache.get(key);
			if (cachedValue) return cachedValue;
			const value = await fn();
			// cached if there's returned value
			if (value != null) redisCache.set(key, value, ttl);

			return value;
		} catch (error) {
			const res = await fn();
			return res;
		}
	}

	async getAll() {
		return this.client.keys('*');
	}
	// Method to clear the entire cache
	clear() {
		if (!this.client.isReady) return;
		this.client.flushDb();
	}
}

const redisCache = new RedisCache('localhost', 6379);

/* const test = async () => {
	await redisCache.connect();
	await redisCache.set('k', 'v');
	console.log(await redisCache.get('k'));
};
test(); */
module.exports = redisCache;
