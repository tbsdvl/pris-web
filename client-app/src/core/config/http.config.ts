import type { CreateAxiosDefaults } from 'axios';

const getHttpConfig = (): CreateAxiosDefaults => {
  const mode = import.meta.env.MODE;
  
  const configs = {
    development: {
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: import.meta.env.TIMEOUT,
    },
    production: {
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: import.meta.env.TIMEOUT,
    },
    staging: {
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: import.meta.env.TIMEOUT,
    },
  };

  return configs[mode as keyof typeof configs] || configs.development;
};

export const httpConfig = getHttpConfig();