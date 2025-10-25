import { type ReactNode } from 'react';
import { useAuthGuard } from '../hooks/useAuthGuard';
import { LoadingSpinner } from '../../core/components/loading-spinner/LoadingSpinnerComponent';

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  fallback?: ReactNode;
}

export function AuthGuard({ 
  children, 
  requireAuth = true, 
  fallback = <LoadingSpinner />
}: AuthGuardProps) {
  const { shouldRender, isLoading } = useAuthGuard({ requireAuth });

  if (isLoading) {
    return <>{fallback}</>;
  }

  if (!shouldRender) {
    return null;
  }

  return <>{children}</>;
}