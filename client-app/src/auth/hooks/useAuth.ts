import { useState, useEffect, useCallback } from 'react';
import { 
  useIsAuthenticated, 
  useMsal, 
  useMsalAuthentication,
  useAccount
} from '@azure/msal-react';
import { InteractionType, InteractionStatus } from '@azure/msal-browser';
import type { AccountInfo } from '@azure/msal-browser';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AccountInfo | null;
  error: Error | null;
}

export interface UseAuthReturn extends AuthState {
  login: (interactionType?: InteractionType) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const account = useAccount();
  
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null,
  });

  const { login: msalLogin, error: msalError } = useMsalAuthentication(
    InteractionType.Redirect,
    {
      account: undefined,
      scopes: [], // Add required scopes here
    }
  );

  // Update auth state based on MSAL state changes
  useEffect(() => {
    const isLoading = inProgress !== InteractionStatus.None;
    
    setAuthState(prev => ({
      ...prev,
      isAuthenticated,
      isLoading,
      user: account || null,
      error: msalError || prev.error,
    }));
  }, [isAuthenticated, inProgress, account, msalError]);

  const login = useCallback(async (interactionType: InteractionType = InteractionType.Redirect) => {
    try {
      setAuthState(prev => ({ ...prev, error: null }));
      
      if (interactionType === InteractionType.Redirect) {
        await msalLogin(InteractionType.Redirect);
      } else {
        await instance.loginPopup({
          scopes: [], // Add required scopes here
        });
      }
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error : new Error('Login failed') 
      }));
    }
  }, [instance, msalLogin]);

  const logout = useCallback(async () => {
    try {
      await instance.logoutRedirect({
        postLogoutRedirectUri: import.meta.env.VITE_API_BASE_URL + 'login',
      });
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error : new Error('Logout failed') 
      }));
    }
  }, [instance]);

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...authState,
    login,
    logout,
    clearError,
  };
};