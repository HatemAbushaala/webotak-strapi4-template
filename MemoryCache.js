class MemoryCache {
  constructor() {
    this.cache = {};
    this.cleanupInterval = 1000 * 60 * 10; // Cleanup interval in milliseconds (e.g., every 10 minutes)
    this.startCleanup();
  }

  // Function to set data in the cache with a specified time-to-live (TTL)
  set(key, value, ttlInSeconds) {
    this.cache[key] = {
      value,
      // Calculate expiry time by adding TTL to current time in milliseconds
      expiry: Date.now() + ttlInSeconds * 1000,
    };
  }

  // Function to get data from the cache
  get(key) {
    const item = this.cache[key];
    if (item && Date.now() < item.expiry) {
      return item.value;
    }
    // If the key has expired or doesn't exist, remove it from the cache
    delete this.cache[key];
    return null;
  }

  // Function to remove a key from the cache
  del(key) {
    if (this.cache[key]) {
      delete this.cache[key];
    }
  }

  // Function to clear the entire cache
  clear() {
    this.cache = {};
  }

  startCleanup() {
    // Set up a periodic cleanup using setInterval
    this.cleanupIntervalId = setInterval(() => {
      const currentTime = Date.now();
      for (const key in this.cache) {
        if (this.cache.hasOwnProperty(key)) {
          const item = this.cache[key];
          if (currentTime >= item.expiry) {
            delete this.cache[key];
          }
        }
      }
    }, this.cleanupInterval);
  }
}

module.exports = MemoryCache;
