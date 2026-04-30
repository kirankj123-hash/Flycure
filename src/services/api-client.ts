import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Interface for request metadata
interface RequestMetadata {
  startTime: number;
}

// Extend axios config to include metadata
interface ExtendedAxiosConfig extends InternalAxiosRequestConfig {
  metadata?: RequestMetadata;
}

// Create axios instance with enhanced configuration
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication and logging
apiClient.interceptors.request.use(
  (config) => {
    // Add timestamp for debugging
    (config as ExtendedAxiosConfig).metadata = { startTime: Date.now() };

    // Add auth token if available (for future auth implementation)
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and logging
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log request duration in development
    if (process.env.NODE_ENV === 'development') {
      const duration = Date.now() - ((response.config as ExtendedAxiosConfig).metadata?.startTime || 0);
      console.log(`API Request: ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration}ms`);
    }
    return response;
  },
  (error: AxiosError) => {
    // Enhanced error handling
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const message = (error.response.data as { message?: string })?.message || error.message;
      
      switch (status) {
        case 400:
          console.error('Bad Request:', message);
          break;
        case 401:
          console.error('Unauthorized:', message);
          // Clear auth token if unauthorized
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
          }
          break;
        case 403:
          console.error('Forbidden:', message);
          break;
        case 404:
          console.error('Not Found:', message);
          break;
        case 429:
          console.error('Too Many Requests:', message);
          break;
        case 500:
          console.error('Internal Server Error:', message);
          break;
        default:
          console.error(`HTTP ${status}:`, message);
      }
    } else if (error.request) {
      // Network error
      console.error('Network Error:', error.message);
    } else {
      // Other error
      console.error('Request Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;