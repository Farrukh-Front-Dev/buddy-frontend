import axios from 'axios';
import { ENV, WS_URL } from '../../config/env';

const api = axios.create({
  baseURL: ENV.API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle 401 and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        try {
          const response = await axios.post(`${ENV.API_URL}auth/token/refresh/`, {
            refresh: refreshToken,
          });

          const { access } = response.data;
          localStorage.setItem('access_token', access);

          if (response.data.refresh) {
            localStorage.setItem('refresh_token', response.data.refresh);
          }

          api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
          return api(originalRequest);
        } catch (refreshError) {
          clearAuth();
          window.location.href = '/auth';
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Clear authentication data
 */
const clearAuth = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('buddy_user');
};

export { WS_URL, clearAuth };
export const MEDIA_BASE_URL = ENV.MEDIA_BASE_URL;
export default api;
