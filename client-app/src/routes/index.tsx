import { UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ROUTES } from '../constants/routes.constants';
import { useEffect } from 'react';
import { CustomLinkComponent } from '../components/custom-link/CustomLinkComponent';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
      if (isAuthenticated) {
        navigate({ to: ROUTES.DASHBOARD });
        return;
      }
    }, [isAuthenticated, navigate]);

    return (
      <UnauthenticatedTemplate>
        <CustomLinkComponent to={ROUTES.LOGIN}>Login</CustomLinkComponent>
      </UnauthenticatedTemplate>
    );
}
