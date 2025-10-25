import { useEffect } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { useAuth } from './useAuth';
import { ROUTES } from '../../constants/routes.constants';

export interface UseAuthGuardOptions {
  requireAuth?: boolean;
  redirectTo?: string;
  fallbackTo?: string;
}

export const useAuthGuard = (options: UseAuthGuardOptions = {}) => {
  const {
    requireAuth = true,
    redirectTo = ROUTES.LOGIN,
    fallbackTo = ROUTES.DASHBOARD,
  } = options;

  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Don't redirect while still loading authentication state
    if (isLoading) {
      return;
    }

    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      navigate({ 
        to: redirectTo,
        search: { 
          redirect: location.pathname !== redirectTo ? location.pathname : undefined 
        },
      });
      return;
    }

    // If authentication is not required but user is authenticated
    if (!requireAuth && isAuthenticated) {
      navigate({ to: fallbackTo });
      return;
    }
  }, [
    isAuthenticated,
    isLoading,
    requireAuth,
    redirectTo,
    fallbackTo,
    navigate,
    location.pathname,
  ]);

  return {
    isAuthenticated,
    isLoading,
    shouldRender: requireAuth ? isAuthenticated && !isLoading : !isAuthenticated && !isLoading,
  };
};