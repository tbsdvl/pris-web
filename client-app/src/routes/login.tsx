import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react';
import { UnauthenticatedTemplate, useIsAuthenticated, useMsalAuthentication } from "@azure/msal-react";
import { InteractionRequiredAuthError, InteractionType } from '@azure/msal-browser';

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {
  const navigate = useNavigate();
  const { login, error } = useMsalAuthentication(InteractionType.Redirect);
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/dashboard' });
    }

    if (error instanceof InteractionRequiredAuthError) {
        login(InteractionType.Redirect);
    }
  }, [error, isAuthenticated]);

  return (
    <>
      <UnauthenticatedTemplate>
          <p>Please wait...</p>
      </UnauthenticatedTemplate>
    </>
  );
}