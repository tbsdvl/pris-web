import type { Configuration } from '@azure/msal-browser';
import { ROUTES } from '../../constants/routes.constants';

export const msalConfig : Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID!,
    authority: 'https://login.microsoftonline.com/organizations',
    redirectUri: import.meta.env.VITE_API_BASE_URL + ROUTES.AUTH_RESPONSE,
    postLogoutRedirectUri: import.meta.env.VITE_API_BASE_URL,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  }
};

export const loginRequest = {
  scopes: ['User.Read'] // Add your required scopes here
};