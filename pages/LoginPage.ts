import { Page } from 'playwright';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  elements = {
    userName: () => this.page.locator('input[name="username"]'),
    password: () => this.page.locator('input[name="password"]'),
    loginButton: () => this.page.locator('input[type="submit"]'),
    errorMessage: () => this.page.locator('.errornote')
  };

  async goto(env : string) {
    await this.page.goto(env);
  }

  async saisirUserName(username: string) {
    await this.elements.userName().fill(username);
  }

  async saisirPassword(password: string) {
    await this.elements.password().fill(password);
  }

  async clickLoginButton() {
    await this.elements.loginButton().click();
  }

  async getErrorMessage(): Promise<string | null> {
    return await this.elements.errorMessage().textContent();
  }
}
