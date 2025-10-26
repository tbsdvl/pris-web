import { createMemoryHistory, createRoute, createRouter } from "@tanstack/react-router";
import { Route as rootRoute } from '../../src/routes/__root';
import { act, createElement } from "react";

export class RouterTestUtils {
  static async createTestRouter(
    component: React.ComponentType<any>,
    path: string = '/',
    initialPath: string = '/'
  ) {
    const history = createMemoryHistory({ initialEntries: [initialPath] });
    const router = createRouter({
      history,
      defaultPendingMinMs: 0,
      routeTree: rootRoute.addChildren([
        createRoute({ 
          getParentRoute: () => rootRoute, 
          path, 
          component: () => createElement(component) 
        }),
      ]),
    });

    await act(() => router.navigate({ to: path }));
    return router;
  }
}