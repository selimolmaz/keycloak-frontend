import axios from 'axios';
import keycloak from '../keycloak';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // Sadece GET istekleri ve belirli endpoint'ler için public
    const isPublicGet = config.method === 'get' && 
                       (config.url?.includes('/projects') || 
                        config.url?.includes('/gallery') || 
                        config.url?.includes('/files'));
    
    // POST /contact public, diğer /contact işlemleri değil
    const isPublicContactPost = config.method === 'post' && config.url?.includes('/contact');
    
    if (!isPublicGet && !isPublicContactPost) {
      const token = keycloak.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Response interceptor - hata yönetimi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized - Token geçersiz veya süresi dolmuş');
    }
    return Promise.reject(error);
  }
);

export default api;