const { test, expect } = require('@playwright/test');

test('Lab 3.2: Verify Sorting - Price Low to High', async ({ page }) => {
  // Login first
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Select "Price (low to high)" from sort dropdown
  await page.getByRole('combobox').selectOption('lohi');

  // Wait for UI to update (temporary - as per lab instructions)
  await page.waitForTimeout(1000);

  // Get all price elements
  const priceElements = await page.locator('.inventory_item_price').allTextContents();

  // Extract numerical values (remove $ and convert to float)
  const prices = priceElements.map(text => parseFloat(text.replace('$', '')));

  // Log to console for visibility 👇
  console.log('\n=== PRODUCT PRICES (AFTER SORTING) ===');
  prices.forEach((price, index) => {
    console.log(`Product #${index + 1}: $${price.toFixed(2)}`);
  });

  // Create a sorted copy for comparison
  const sortedPrices = [...prices].sort((a, b) => a - b);

  // Log expected sorted order
  console.log('\n=== EXPECTED SORTED ORDER ===');
  sortedPrices.forEach((price, index) => {
    console.log(`Expected #${index + 1}: $${price.toFixed(2)}`);
  });

  // ✅ ASSERT: Prices must be in ascending order
  expect(prices).toEqual(sortedPrices);

  console.log('\n✅ TEST PASSED: Products are correctly sorted from low to high price.\n');
});