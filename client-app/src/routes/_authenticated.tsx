import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AuthGuard } from '../auth/guards/AuthGuard';

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <AuthGuard requireAuth={true}>
      <Outlet />
    </AuthGuard>
  );
}