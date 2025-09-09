const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class ProductDetailsPage extends BasePage {
  constructor(page) {
    super(page);
    this.productName = page.locator('[data-test="inventory-item-name"]');
this.productDescription = page.locator('[data-test="inventory-item-desc"]');
this.productPrice = page.locator('[data-test="inventory-item-price"]');
    // Add to Cart button using CSS locator (as requested)
    this.addToCartButton = page.locator('button.btn.btn_primary.btn_small.btn_inventory[data-test="add-to-cart"]');
  }

  async clickAddToCart() {
    await this.addToCartButton.click();
  }
    async verifyProductDetails(expectedName, expectedDescriptionSnippet, expectedPrice) {
    await expect(this.productName).toContainText(expectedName);
    await expect(this.productDescription).toContainText(expectedDescriptionSnippet);
    await expect(this.productPrice).toContainText(expectedPrice);
  }
    async verifyRemoveButtonVisible() {
    const removeButton = this.page.locator('[data-test="remove"]');
    await expect(removeButton).toBeVisible();
  }
}

module.exports = { ProductDetailsPage };