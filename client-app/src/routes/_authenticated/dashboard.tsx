import { AuthenticatedTemplate } from '@azure/msal-react';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardComponent,
});

function DashboardComponent() {
  return (
    <AuthenticatedTemplate>
      <div className="p-6">
        <p>Hello world</p>
      </div>
    </AuthenticatedTemplate>
  );
}