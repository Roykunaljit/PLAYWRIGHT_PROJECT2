const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');

test('Add Multiple Items and Verify Cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');

  // Add Backpack
  await inventoryPage.addItemToCartByDataTest('add-to-cart-sauce-labs-backpack');

  // Add Bike Light (using CSS locator as requested)
  await inventoryPage.addItemToCartByDataTest('add-to-cart-sauce-labs-bike-light');

  // Verify Badge
  const badgeCount = await inventoryPage.getCartCount();
  expect(badgeCount).toBe('2');

  // Go to Cart
  await inventoryPage.goToCart();
  await cartPage.verifyCartPageLoaded();

  // Verify Items in Cart
  await cartPage.verifyCartItem(
    'Sauce Labs Backpack',
    'carry.allTheThings() with the sleek, streamlined Sly Pack',
    '$29.99'
  );
  await cartPage.verifyCartItem(
    'Sauce Labs Bike Light',
    'A red light isn\'t the desired state in testing',
    '$9.99'
  );
});