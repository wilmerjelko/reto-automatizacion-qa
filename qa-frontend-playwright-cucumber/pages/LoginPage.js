import { config } from '../features/support/config.js';

export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigate() {
    await this.page.goto(config.baseUrl);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Inicia sesión con el usuario estándar definido en la configuración.
   */
  async loginAsStandardUser() {
    const { username, password } = config.users.standard;
    await this.login(username, password);
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async isLoginFormVisible() {
    return await this.loginButton.isVisible();
  }
}
