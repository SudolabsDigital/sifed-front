import axios from 'axios';
import Cookies from 'js-cookie';
import { AUTH_COOKIE_NAME } from './auth-config';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Interceptor para agregar el token automáticamente a cada petición
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    // Obtenemos el token de la cookie
    const token = Cookies.get(AUTH_COOKIE_NAME);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
