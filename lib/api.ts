import axios from 'axios';
import Cookies from 'js-cookie';
import { AUTH_COOKIE_NAME } from './auth-config';

const api = axios.create({
  // Aseguramos que la URL sea absoluta para evitar problemas en rutas dinámicas
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Interceptor para agregar el token automáticamente a cada petición
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    // Intentamos obtener el token de la cookie
    const token = Cookies.get(AUTH_COOKIE_NAME);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor de respuesta para depuración profesional
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === "Network Error") {
      console.error("🚨 Error de Red Crítico:", {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
        headers: error.config?.headers
      });
    }
    return Promise.reject(error);
  }
);

export default api;
