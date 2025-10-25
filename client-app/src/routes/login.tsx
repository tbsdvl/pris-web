import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated, useMsalAuthentication } from "@azure/msal-react";
import { InteractionRequiredAuthError, InteractionType } from '@azure/msal-browser';

export const Route = createFileRoute('/login')({
  component: LoginComponent,
  // No loader/beforeLoad - handle everything in component
})

function LoginComponent() {
  const navigate = useNavigate();
  const { login, error } = useMsalAuthentication(InteractionType.Redirect);
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (isAuthenticated) {
      navigate({ to: '/dashboard' });
      return;
    }

    // Handle authentication errors
    if (error instanceof InteractionRequiredAuthError) {
      login(InteractionType.Redirect);
    }
  }, [error, isAuthenticated, navigate, login]);

  return (
    <>
      <AuthenticatedTemplate>
        <p>Redirecting to dashboard...</p>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>Please wait, authenticating...</p>
      </UnauthenticatedTemplate>
    </>
  );
}