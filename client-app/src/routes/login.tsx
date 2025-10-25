import { createFileRoute } from '@tanstack/react-router';
import { AuthGuard } from '../auth/guards/AuthGuard';
import { LoginRedirectorComponent } from '../auth/components/LoginRedirector';

export const Route = createFileRoute('/login')({
  component: LoginComponent,
});

function LoginComponent() {
  return (
    <AuthGuard requireAuth={false}>
      <LoginRedirectorComponent />
    </AuthGuard>
  );
}