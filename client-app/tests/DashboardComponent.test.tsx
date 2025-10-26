import { screen } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, test, expect } from "vitest";
import { DashboardComponent } from '../src/routes/_authenticated/dashboard';
import { 
  MsalTestUtils, 
  RouterTestUtils, 
  renderWithProviders 
} from './test-utils';

describe('Dashboard', () => {
  let msalUtils: MsalTestUtils;

  beforeEach(() => {
    msalUtils = new MsalTestUtils();
    msalUtils.setup();
  });
  
  afterEach(() => {
    msalUtils.teardown();
  });
  
  test('Dashboard component renders correctly for authenticated users.', async () => {
    const router = await RouterTestUtils.createTestRouter(
      DashboardComponent, 
      '/dashboard', 
      '/dashboard'
    );
    
    await msalUtils.login();

    renderWithProviders(<div />, { 
      msalUtils, 
      router 
    });
    
    await msalUtils.waitForRedirect();
    expect(screen.getByText(/Dashboard/)).toBeTruthy();
    expect(screen.getByText(/Test User/)).toBeTruthy();
  });
});