import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react';
import { AuthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
  // No beforeLoad - handle in component
});

function AuthenticatedLayout() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login' });
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthenticatedTemplate>
      <Outlet />
    </AuthenticatedTemplate>
  );
}