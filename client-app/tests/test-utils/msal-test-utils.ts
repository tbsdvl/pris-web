import { MsalReactTester } from "msal-react-tester";

export class MsalTestUtils {
  public msalTester: MsalReactTester;

  constructor() {
    this.msalTester = new MsalReactTester();
  }

  setup() {
    this.msalTester.spyMsal();
  }

  teardown() {
    this.msalTester.resetSpyMsal();
  }

  async login() {
    await this.msalTester.isLogged();
    
    const user = this.msalTester.accounts[0];
    if (user) {
      user.name = 'Test User';
    }
  }

  async waitForRedirect() {
    await this.msalTester.waitForRedirect();
  }
}