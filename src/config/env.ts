/**
 * Environment Configuration
 * Centralized configuration for API URLs and app settings
 */

export const ENV = {
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || 'https://buddy-backend-v1-1.onrender.com/api/v1/',
  MEDIA_BASE_URL: import.meta.env.VITE_MEDIA_BASE_URL || 'https://buddy-backend-v1-1.onrender.com',
  
  // Gemini API
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || '',
  
  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Buddy Team Portal',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

/**
 * WebSocket URL derived from API URL
 */
export const WS_URL = ENV.API_URL.replace('http', 'ws').replace('/api/v1/', '/ws/');

/**
 * Validate environment configuration
 */
export const validateEnv = (): void => {
  if (!ENV.API_URL) {
    console.warn('⚠️ VITE_API_URL is not configured');
  }
  
  if (!ENV.MEDIA_BASE_URL) {
    console.warn('⚠️ VITE_MEDIA_BASE_URL is not configured');
  }
};

// Validate on import
validateEnv();
