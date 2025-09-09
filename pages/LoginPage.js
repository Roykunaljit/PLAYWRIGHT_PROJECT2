const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Locators using data-test (reliable), role, and CSS
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.swagLabsTitle = page.getByText('Swag Labs');
    this.loginContainer = page.locator('#login_button_container');
  }

  async verifyLoginPageLoaded() {
    await expect(this.swagLabsTitle).toBeVisible();
    await expect(this.usernameInput).toBeEmpty();
    await expect(this.passwordInput).toBeEmpty();
    await expect(this.loginButton).toContainText('Login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };