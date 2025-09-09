const { test , expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test('Login and Navigate to Inventory', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.verifyInventoryPageLoaded();
});