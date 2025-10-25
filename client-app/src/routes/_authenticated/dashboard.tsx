import { AuthenticatedTemplate } from '@azure/msal-react';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardComponent,
});

function DashboardComponent() {
  return (
    <AuthenticatedTemplate>
      <p>Hello world</p>
    </AuthenticatedTemplate>
  );
}