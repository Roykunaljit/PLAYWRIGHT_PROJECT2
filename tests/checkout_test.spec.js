const { test , expect} = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutStepOnePage } = require('../pages/CheckoutStepOnePage');
const { CheckoutStepTwoPage } = require('../pages/CheckoutStepTwoPage');
const { CheckoutCompletePage } = require('../pages/CheckoutCompletePage');

test('Complete End-to-End Checkout Flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutOne = new CheckoutStepOnePage(page);
  const checkoutTwo = new CheckoutStepTwoPage(page);
  const checkoutComplete = new CheckoutCompletePage(page);

  // Login
  await loginPage.goto('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');

  // Add Items
  await inventoryPage.addItemToCartByDataTest('add-to-cart-sauce-labs-backpack');
  await inventoryPage.addItemToCartByDataTest('add-to-cart-sauce-labs-bike-light');

  // Go to Cart
  await inventoryPage.goToCart();

  // Checkout Step One
  await cartPage.clickCheckout();
  await checkoutOne.verifyStepOnePage();
  await checkoutOne.fillInfo('Kunaljit', 'Roy', '799003');
  await checkoutOne.clickContinue();

  // Checkout Step Two
  await checkoutTwo.verifyOverviewPage();
  await checkoutTwo.verifyOrderSummary('Item total: $39.98', 'Tax: $3.20', 'Total: $43.18');
  await checkoutTwo.clickFinish();

  // Checkout Complete
  await checkoutComplete.verifyCompletePage();
  await checkoutComplete.clickBackHome();

  // Verify navigated back to inventory
  await inventoryPage.verifyInventoryPageLoaded();
});