import './App.css';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { useAuth } from './auth/hooks/useAuth';
import { AppProvider } from './auth/components/AppProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function RouterContextProvider() {
  const { isAuthenticated, isLoading } = useAuth();
  return (
    <RouterProvider 
      router={router} 
      context={{ isAuthenticated: isAuthenticated && !isLoading }} 
    />
  );
}

const client = new QueryClient();

function App() {
  return (
    <AppProvider>
      <QueryClientProvider client={client}>
        <RouterContextProvider />
      </QueryClientProvider>
    </AppProvider>
  );
}

export default App;