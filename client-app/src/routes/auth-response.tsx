import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth-response')({
  component: AuthResponseComponent,
})

function AuthResponseComponent() {
  return (
    <p>Please wait...</p>
  );
}
