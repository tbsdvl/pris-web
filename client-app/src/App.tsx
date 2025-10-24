import './App.css';

import { createRootRoute, createRouter, Outlet, RouterProvider } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { AuthProvider, useAuth } from './auth';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

const routeTree = rootRoute.addChildren([
  // ... other routes
]);

const router = createRouter({
  routeTree,
});

function InnerApp() {
  const auth = useAuth()
  return (
    <>
      <RouterProvider router={router} context={auth} />
      <TanStackRouterDevtools router={router} />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

export default App