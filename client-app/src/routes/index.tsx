import { createFileRoute } from '@tanstack/react-router';
import { ROUTES } from '../constants/routes.constants';
import { AuthGuard } from '../auth/guards/AuthGuard';
import { CustomLinkComponent } from '../core/components/custom-link/CustomLinkComponent';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthGuard requireAuth={false}>
      <div className='p-8'>
        <h1 className='text-2xl font-bold mb-4'>Welcome</h1>
        <CustomLinkComponent to={ROUTES.LOGIN}>
          Login
        </CustomLinkComponent>
      </div>
    </AuthGuard>
  );
}