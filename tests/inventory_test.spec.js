const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { ProductDetailsPage } = require('../pages/ProductDetailsPage');

test('Inventory Interactions: Sort, Add to Cart, View Details', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const productDetailsPage = new ProductDetailsPage(page);

  await loginPage.goto('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');

  // Open/Close Menu
  await inventoryPage.openAndCloseMenu();

  // Sort Products
  await inventoryPage.sortProducts('lohi');

  // Click Product Image
  await inventoryPage.clickBackpackImage();

  // Verify Product Details
  await productDetailsPage.verifyProductDetails(
    'Sauce Labs Backpack',
    'carry.allTheThings() with the sleek, streamlined Sly Pack',
    '$29.99'
  );

  // Add to Cart from Product Details
  await productDetailsPage.clickAddToCart();
  await productDetailsPage.verifyRemoveButtonVisible();

  // Verify Cart Badge
  const badgeCount = await inventoryPage.getCartCount();
  expect(badgeCount).toBe('1');

  // Go back to inventory
  await page.goBack();
});