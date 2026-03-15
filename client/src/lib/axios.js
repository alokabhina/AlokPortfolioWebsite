import axios from 'axios'

const api = axios.create({
  baseURL:         import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true,
  timeout:         10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// Response interceptor — 401 redirect ONLY from protected pages, NOT from login page
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const path = window.location.pathname
      // Only redirect if on admin-dashboard, NOT on admin-login (prevents loop)
      if (path === '/admin-dashboard') {
        window.location.href = '/admin-login'
      }
    }
    return Promise.reject(error)
  }
)

export default api