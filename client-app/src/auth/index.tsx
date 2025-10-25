import { MsalProvider, useIsAuthenticated } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import type { Configuration } from '@azure/msal-browser';
import type { ReactNode } from 'react';

const msalConfig : Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID!,
    authority: "https://login.microsoftonline.com/organizations",
    redirectUri: import.meta.env.VITE_API_BASE_URL + 'auth-response',
    postLogoutRedirectUri: import.meta.env.VITE_API_BASE_URL + 'login',
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  }
};

const pca = new PublicClientApplication(msalConfig);

export const AppProvider = ({ children }: { children: ReactNode }) => {   
  return (
    <MsalProvider instance={pca}>
      {children}
    </MsalProvider>
  );
}