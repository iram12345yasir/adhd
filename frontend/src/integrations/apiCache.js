// API caching integration
import CacheEngine from '../engine/cache';
import api from '../api';

const cache = new CacheEngine({ ttl: 5 * 60 * 1000 });

const cachedAPI = {
  async get(endpoint, options = {}) {
    const cacheKey = `GET:${endpoint}`;
    
    // Return cached if available and not forcing refresh
    if (!options.skipCache && cache.has(cacheKey)) {
      return { data: cache.get(cacheKey), cached: true };
    }

    try {
      const response = await api.get(endpoint);
      cache.set(cacheKey, response.data, options.ttl);
      return { data: response.data, cached: false };
    } catch (error) {
      // Return cached on error if available
      if (cache.has(cacheKey)) {
        console.warn(`API error, returning cached data for ${endpoint}`);
        return { data: cache.get(cacheKey), cached: true, error };
      }
      throw error;
    }
  },

  async post(endpoint, payload, options = {}) {
    try {
      const response = await api.post(endpoint, payload);
      // Invalidate related caches
      cache.delete(`GET:${endpoint}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async patch(endpoint, payload, options = {}) {
    try {
      const response = await api.patch(endpoint, payload);
      // Invalidate related caches
      const baseEndpoint = endpoint.split('/').slice(0, -1).join('/');
      cache.delete(`GET:${baseEndpoint}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  invalidate(pattern) {
    // Invalidate all keys matching pattern
    cache.clear();
  }
};

export default cachedAPI;
