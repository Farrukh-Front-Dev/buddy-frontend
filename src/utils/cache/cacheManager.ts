/**
 * Cache Manager - API responses va data uchun cache tizimi
 * TTL (Time To Live) bilan ishlaydi
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // milliseconds
}

class CacheManager {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private timers: Map<string, NodeJS.Timeout> = new Map();

  /**
   * Cache ga data qo'shish
   */
  set<T>(key: string, data: T, ttlSeconds: number = 300): void {
    // Eski timer ni o'chirish
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
    }

    const ttlMs = ttlSeconds * 1000;
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    });

    // Auto cleanup timer
    const timer = setTimeout(() => {
      this.delete(key);
    }, ttlMs);

    this.timers.set(key, timer);
  }

  /**
   * Cache dan data olish
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > entry.ttl;

    if (isExpired) {
      this.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Cache dan data o'chirish
   */
  delete(key: string): void {
    this.cache.delete(key);
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
      this.timers.delete(key);
    }
  }

  /**
   * Barcha cache o'chirish
   */
  clear(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.cache.clear();
    this.timers.clear();
  }

  /**
   * Cache mavjudligini tekshirish
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Cache statistikasi
   */
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Singleton instance
export const cacheManager = new CacheManager();

// Cache keys constants
export const CACHE_KEYS = {
  // Users
  ALL_USERS: 'all_users',
  USER_BY_ID: (id: string) => `user_${id}`,
  CURATORS: 'curators',
  STUDENTS: 'students',

  // Monitoring
  MONITORING_DATA: 'monitoring_data',
  STUDENT_PROGRESS: (studentId: string) => `student_progress_${studentId}`,

  // Highlights
  HIGHLIGHTS: 'highlights',
  HIGHLIGHTS_BY_CURATOR: (curatorId: string) => `highlights_${curatorId}`,

  // Seasons
  SEASONS: 'seasons',
  ACTIVE_SEASON: 'active_season',

  // Notifications
  NOTIFICATIONS: 'notifications',
  UNREAD_NOTIFICATIONS: 'unread_notifications',
};

// Cache TTL constants (seconds)
export const CACHE_TTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 900, // 15 minutes
  VERY_LONG: 3600, // 1 hour
};
