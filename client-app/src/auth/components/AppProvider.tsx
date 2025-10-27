import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '../../core/config/msal.config';
import type { ReactNode } from 'react';
import { MsalProvider } from '@azure/msal-react';

const pca = new PublicClientApplication(msalConfig);

export const AppProvider = ({ children }: { children: ReactNode }) => {   
  return (
    <MsalProvider instance={pca}>
      {children}
    </MsalProvider>
  );
}