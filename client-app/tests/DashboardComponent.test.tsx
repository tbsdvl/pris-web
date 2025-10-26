import { MsalProvider } from "@azure/msal-react";
import { render, screen } from "@testing-library/react";
import { MsalReactTester } from "msal-react-tester";
import React, { act } from "react";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { Route as rootRoute } from '../src/routes/__root';
import { DashboardComponent } from '../src/routes/_authenticated/dashboard';
import { createMemoryHistory, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";

async function setupRouter(initialPath: string = '/') {
  const history = createMemoryHistory({ initialEntries: [initialPath] });
  const router = createRouter({
    history,
    defaultPendingMinMs: 0,
    routeTree: rootRoute.addChildren([
      createRoute({ getParentRoute: () => rootRoute, path: '/dashboard', component: () => <DashboardComponent /> }),
    ]),
  });

  await act(() => router.navigate({ to: '/dashboard' }));

  return router;
}

describe('Dashboard', () => {
  
  let msalTester: MsalReactTester;
  beforeEach(() => {
    msalTester = new MsalReactTester(); 
    msalTester.spyMsal();
  });
  
  afterEach(() => {
    msalTester.resetSpyMsal();
  });
  
  test('Dashboard component renders correctly for authenticated users.', async () => {
    const router = await setupRouter('/dashboard');  
    await msalTester.isLogged();
  
    render(
      <MsalProvider instance={msalTester.client}>
        <RouterProvider router={router} />
      </MsalProvider>,
    );
    
    await msalTester.waitForRedirect();
    expect(screen.getByText(/Dashboard/)).toBeTruthy();
  });
})

