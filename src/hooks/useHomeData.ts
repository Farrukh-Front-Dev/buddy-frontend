/**
 * Custom Hook - Home page data fetching
 * Cache va optimization bilan
 */

import { useState, useEffect, useCallback } from 'react';
import { cachedApi } from '../utils/api/cachedApi';
import { CACHE_KEYS, CACHE_TTL } from '../utils/cache/cacheManager';
import { UserData, Season } from '../types';

interface UseHomeDataReturn {
  curators: UserData[];
  seasons: Season[];
  activeSeason: Season | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useHomeData = (): UseHomeDataReturn => {
  const [curators, setCurators] = useState<UserData[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [activeSeason, setActiveSeason] = useState<Season | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch curators (active ones only)
      const allUsers = await cachedApi.get<UserData[]>('users/', {
        ttl: CACHE_TTL.LONG,
      });

      const activeCurators = allUsers.filter(
        (u) => u.role === 'curator' && u.status === 'active'
      );
      setCurators(activeCurators);

      // Fetch seasons
      const seasonsData = await cachedApi.get<Season[]>('seasons/', {
        ttl: CACHE_TTL.VERY_LONG,
      });

      setSeasons(seasonsData);

      // Find active season
      const active = seasonsData.find((s) => s.isActive) || seasonsData[0];
      setActiveSeason(active || null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      console.error('Error fetching home data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    curators,
    seasons,
    activeSeason,
    isLoading,
    error,
    refetch: fetchData,
  };
};
