import { createFileRoute } from '@tanstack/react-router'
import React, { useEffect } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsalAuthentication } from "@azure/msal-react";
import { InteractionRequiredAuthError, InteractionType } from '@azure/msal-browser';

export const Route = createFileRoute('/login')({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || '/',
  }),
  beforeLoad: () => {
  },
  component: LoginComponent,
})

function LoginComponent() {
  const { login, result, error } = useMsalAuthentication(InteractionType.Popup);

  useEffect(() => {
    if (error instanceof InteractionRequiredAuthError) {
        login(InteractionType.Popup);
    }
}, [error]);

  return (
    <React.Fragment>
        <p>Anyone can see this paragraph.</p>
        <AuthenticatedTemplate>
            <p>At least one account is signed in!</p>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
            <p>No users are signed in!</p>
        </UnauthenticatedTemplate>
    </React.Fragment>
  );
}