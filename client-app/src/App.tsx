import './App.css';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { useAuth } from './auth/hooks/useAuth';
import { AppProvider } from './auth/components/AppProvider';

function RouterContextProvider() {
  const { isAuthenticated, isLoading } = useAuth();
  return (
    <RouterProvider 
      router={router} 
      context={{ isAuthenticated: isAuthenticated && !isLoading }} 
    />
  );
}

function App() {
  return (
    <AppProvider>
      <RouterContextProvider />
    </AppProvider>
  );
}

export default App;