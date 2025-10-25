import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react';
import { useIsAuthenticated } from '@azure/msal-react';
import { ROUTES } from '../constants/routes.constants';
import { ProtectedComponent } from '../components/protected/ProtectedComponent';

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: ROUTES.LOGIN });
    }
  }, [isAuthenticated, navigate]);

  return (
    <ProtectedComponent>
      <Outlet />
    </ProtectedComponent>
  );
}