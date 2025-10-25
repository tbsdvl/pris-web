import { useIsAuthenticated } from '@azure/msal-react';
import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    const isAuthenticated = useIsAuthenticated();
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          // Save current location for redirect after login
          redirect: location.href,
        },
      })
    }
  },
  component: () => <Outlet />,
})