const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { ProductDetailsPage } = require('../pages/ProductDetailsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutStepOnePage } = require('../pages/CheckoutStepOnePage');
const { CheckoutStepTwoPage } = require('../pages/CheckoutStepTwoPage');
const { CheckoutCompletePage } = require('../pages/CheckoutCompletePage');

test('Navigation-Heavy E2E Flow as Described', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const productDetailsPage = new ProductDetailsPage(page);
  const cartPage = new CartPage(page);
  const checkoutOne = new CheckoutStepOnePage(page);
  const checkoutTwo = new CheckoutStepTwoPage(page);
  const checkoutComplete = new CheckoutCompletePage(page);

  // 1. Go to login page and login
  await loginPage.goto('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');

  // 2. Click on first product image (Backpack) using XPath
  await inventoryPage.clickBackpackImage();

  // 3. On product detail page, click "Add to Cart" using CSS locator
  await productDetailsPage.clickAddToCart();

  // 4. Go back to inventory page
  await page.goBack();

  // 5. Sort by Price (low to high)
  await inventoryPage.sortProducts('lohi');

  // 6. Add "Sauce Labs Bike Light" to cart (without entering its detail page)
  await inventoryPage.addBikeLightToCart();

  // 7. Verify cart count is "2"
  const cartCount = await inventoryPage.getCartCount();
  if (cartCount !== '2') {
    throw new Error(`Expected cart count 2, but got ${cartCount}`);
  }

  // 8. Go to cart page
  await inventoryPage.goToCart();

  // 9. Click Checkout
  await cartPage.clickCheckout();

  // 10. DEMO: goBack() then goForward()
  await page.goBack(); // Back to cart
  await page.goForward(); // Forward to checkout info

  // 11. Fill checkout info
  await checkoutOne.fillInfo('Kunaljit', 'Roy', '799003');
  await checkoutOne.clickContinue();

  // 12. On Checkout Overview, reload page
  await page.reload();

  // 13. Click Finish
  await checkoutTwo.clickFinish();

  // 14. Keep going back until we reach inventory page
  let currentURL = await page.url();
  while (!currentURL.includes('/inventory.html')) {
    await page.goBack();
    currentURL = await page.url();
    console.log(`Went back. Current URL: ${currentURL}`);
  }

  // 15. Final verification: We are on inventory page
  await page.waitForURL('**/inventory.html');
  console.log('✅ Successfully navigated back to inventory page.');
});