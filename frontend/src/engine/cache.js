// Fast in-memory cache with TTL support for API responses

class CacheEngine {
  constructor(options = {}) {
    this.store = new Map();
    this.timers = new Map();
    this.ttl = options.ttl || 5 * 60 * 1000; // 5 minutes default
    this.maxSize = options.maxSize || 100; // Max cache entries
  }

  set(key, value, ttl = this.ttl) {
    // Evict oldest if at max size
    if (this.store.size >= this.maxSize) {
      const firstKey = this.store.keys().next().value;
      this.delete(firstKey);
    }

    this.store.set(key, {
      value,
      timestamp: Date.now(),
      ttl
    });

    // Clear old timer
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
    }

    // Set new timer for auto-expiry
    if (ttl > 0) {
      const timer = setTimeout(() => this.delete(key), ttl);
      this.timers.set(key, timer);
    }
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.delete(key);
      return null;
    }

    return entry.value;
  }

  has(key) {
    return this.get(key) !== null;
  }

  delete(key) {
    this.store.delete(key);
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
      this.timers.delete(key);
    }
  }

  clear() {
    this.timers.forEach(timer => clearTimeout(timer));
    this.store.clear();
    this.timers.clear();
  }

  size() {
    return this.store.size;
  }
}

export default CacheEngine;
