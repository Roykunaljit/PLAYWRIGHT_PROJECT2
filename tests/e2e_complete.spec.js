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
  await loginPage.verifyLoginPageLoaded();
  await loginPage.login('standard_user', 'secret_sauce');

  // 2. Click on first product image (Backpack) using XPath
  await inventoryPage.clickBackpackImage();

  // 3. On product detail page, click "Add to Cart" using CSS locator
  await productDetailsPage.clickAddToCart();
  await productDetailsPage.verifyProductDetails(
    'Sauce Labs Backpack',
    'carry.allTheThings() with the sleek, streamlined Sly Pack',
    '$29.99'
  );
  await productDetailsPage.verifyRemoveButtonVisible();

  // 4. Go back to inventory page
  await page.goBack();
  await inventoryPage.verifyInventoryPageLoaded();


  // 5. Sort by Price (low to high)
  await inventoryPage.sortProducts('lohi');

  // 6. Add "Sauce Labs Bike Light" to cart (without entering its detail page)
  await inventoryPage.addBikeLightToCart();
  await inventoryPage.addItemToCartByDataTest('add-to-cart-sauce-labs-bolt-t-shirt'); // Adding another item to ensure cart count is 2

  // 7. Verify cart count is "2"
  const cartCount = await inventoryPage.getCartCount();
  if (cartCount !== '3') {
    throw new Error(`Expected cart count 3, but got ${cartCount}`);
  }
  await inventoryPage.openAndCloseMenu();


  // 8. Go to cart page
  await inventoryPage.goToCart();
  await cartPage.verifyCartPageLoaded();
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
 await cartPage.verifyCartItem(
  'Sauce Labs Bolt T-Shirt', 
  'bolt T-shirt',
   '$15.99');


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
  await checkoutTwo.verifyOverviewPage();
  await checkoutTwo.verifyOrderSummary('Item total: $55.97', 'Tax: $4.48', 'Total: $60.45');

  // 13. Click Finish
  await checkoutTwo.clickFinish();
  await checkoutComplete.verifyCompletePage();
  


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