import { AuthenticatedTemplate } from "@azure/msal-react";
import type { ReactNode } from "react";

export function ProtectedComponent({ children }: { children: ReactNode}) {
  return (
    <AuthenticatedTemplate>
      {children}
    </AuthenticatedTemplate>
  );
}