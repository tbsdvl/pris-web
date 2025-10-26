import { type ReactNode } from 'react';
import { UnauthenticatedTemplate } from '@azure/msal-react';

export function PublicComponent({ children }: { children: ReactNode }) {
  return (
    <UnauthenticatedTemplate>
      {children}
    </UnauthenticatedTemplate>
  );
}