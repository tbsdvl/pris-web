import type { CreateAxiosDefaults } from 'axios';

// API configuration based on environment
const getHttpConfig = (): CreateAxiosDefaults => {
  const mode = import.meta.env.MODE; // 'development', 'production', etc.
  
  const configs = {
    development: {
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: import.meta.env.TIMEOUT,
      withCredentials: true,
    },
    production: {
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: import.meta.env.TIMEOUT,
      withCredentials: true,
    },
    staging: {
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: import.meta.env.TIMEOUT,
      withCredentials: true,
    },
  };

  return configs[mode as keyof typeof configs] || configs.development;
};

export const httpConfig = getHttpConfig();