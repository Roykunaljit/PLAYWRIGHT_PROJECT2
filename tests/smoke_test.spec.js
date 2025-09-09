const { test , expect} = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('Smoke Test: Verify Site Loads', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto('https://www.saucedemo.com/');
  await loginPage.verifyLoginPageLoaded();
});