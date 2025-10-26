import { MsalProvider } from "@azure/msal-react";
import { render, RenderOptions } from "@testing-library/react";
import React from "react";
import { RouterProvider } from "@tanstack/react-router";
import { MsalTestUtils } from "./msal-test-utils";

interface TestRenderOptions extends RenderOptions {
  msalUtils?: MsalTestUtils;
  router?: any;
}

export function renderWithProviders(
  ui: React.ReactElement,
  options: TestRenderOptions = {}
) {
  const { msalUtils, router, ...renderOptions } = options;

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (router && msalUtils) {
      return (
        <MsalProvider instance={msalUtils.msalTester.client}>
          <RouterProvider router={router} />
        </MsalProvider>
      );
    } else if (msalUtils) {
      return (
        <MsalProvider instance={msalUtils.msalTester.client}>
          {children}
        </MsalProvider>
      );
    } else if (router) {
      return <RouterProvider router={router} />;
    }
    
    return <>{children}</>;
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}