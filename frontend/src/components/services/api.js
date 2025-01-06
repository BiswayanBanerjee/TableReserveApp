import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use NEXT_PUBLIC for public environment variables
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') { // Ensure localStorage is accessed only in the browser
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;