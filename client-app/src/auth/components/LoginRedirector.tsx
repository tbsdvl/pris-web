import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { InteractionType } from '@azure/msal-browser';
import { LoadingSpinnerComponent } from '../../core/components/loading-spinner/LoadingSpinnerComponent';

export function LoginRedirectorComponent() {
  const { login, isLoading, error } = useAuth();

  useEffect(() => {
    // Auto-login when this component mounts
    if (!isLoading) {
      login(InteractionType.Redirect);
    }
  }, [login, isLoading]);

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl text-red-600 mb-4">Authentication Error</h2>
        <p className="mb-4">{error.message}</p>
        <button 
          onClick={() => login(InteractionType.Redirect)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return <LoadingSpinnerComponent />;
}