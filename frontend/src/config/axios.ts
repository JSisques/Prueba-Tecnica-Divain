import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useSession } from 'next-auth/react';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4224/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptores de solicitudes
axiosInstance.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Interceptores de respuestas
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      console.log('Usuario no autorizado');
      window.location.href = '/api/auth/signin';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
