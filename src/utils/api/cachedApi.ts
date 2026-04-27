/**
 * Cached API Client - API calls uchun cache wrapper
 */

import api from '../../services/api/client';
import { cacheManager, CACHE_KEYS, CACHE_TTL } from '../cache/cacheManager';

interface CachedApiOptions {
  ttl?: number;
  forceRefresh?: boolean;
}

class CachedApiClient {
  /**
   * GET request with caching
   */
  async get<T>(
    endpoint: string,
    options: CachedApiOptions = {}
  ): Promise<T> {
    const { ttl = CACHE_TTL.MEDIUM, forceRefresh = false } = options;

    // Check cache first
    if (!forceRefresh) {
      const cached = cacheManager.get<T>(endpoint);
      if (cached) {
        console.log(`[Cache HIT] ${endpoint}`);
        return cached;
      }
    }

    try {
      console.log(`[API CALL] GET ${endpoint}`);
      const response = await api.get(endpoint);
      const data = response.data as T;

      // Store in cache
      cacheManager.set(endpoint, data, ttl);

      return data;
    } catch (error) {
      console.error(`[API ERROR] GET ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * POST request (no caching)
   */
  async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      console.log(`[API CALL] POST ${endpoint}`);
      const response = await api.post(endpoint, data);
      return response.data as T;
    } catch (error) {
      console.error(`[API ERROR] POST ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * PATCH request with cache invalidation
   */
  async patch<T>(
    endpoint: string,
    data: any,
    invalidateKeys?: string[]
  ): Promise<T> {
    try {
      console.log(`[API CALL] PATCH ${endpoint}`);
      const response = await api.patch(endpoint, data);
      const result = response.data as T;

      // Invalidate related caches
      if (invalidateKeys) {
        invalidateKeys.forEach((key) => cacheManager.delete(key));
      }

      return result;
    } catch (error) {
      console.error(`[API ERROR] PATCH ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * DELETE request with cache invalidation
   */
  async delete<T>(
    endpoint: string,
    invalidateKeys?: string[]
  ): Promise<T> {
    try {
      console.log(`[API CALL] DELETE ${endpoint}`);
      const response = await api.delete(endpoint);
      const result = response.data as T;

      // Invalidate related caches
      if (invalidateKeys) {
        invalidateKeys.forEach((key) => cacheManager.delete(key));
      }

      return result;
    } catch (error) {
      console.error(`[API ERROR] DELETE ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * Cache ni invalidate qilish
   */
  invalidateCache(keys: string[]): void {
    keys.forEach((key) => cacheManager.delete(key));
  }

  /**
   * Barcha cache ni o'chirish
   */
  clearCache(): void {
    cacheManager.clear();
  }

  /**
   * Cache statistikasi
   */
  getCacheStats() {
    return cacheManager.getStats();
  }
}

export const cachedApi = new CachedApiClient();
