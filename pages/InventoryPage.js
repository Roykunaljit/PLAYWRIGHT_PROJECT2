const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
     this.productsHeader = page.locator('[data-test="primary-header"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.closeMenuButton = page.getByRole('button', { name: 'Close Menu' });

    // Locator for Sauce Labs Bike Light "Add to Cart" (CSS + data-test)
    this.bikeLightAddToCart = page.locator('button#add-to-cart-sauce-labs-bike-light[data-test="add-to-cart-sauce-labs-bike-light"]');
  }

    async addItemToCartByDataTest(dataTestValue) {
    const addToCartBtn = this.page.locator(`[data-test="${dataTestValue}"]`);
    await addToCartBtn.click();
  }

  // Click product image using XPath (as requested)
  async clickBackpackImage() {
    const backpackImage = this.page.locator('//*[@id="item_4_img_link"]/img');
    await backpackImage.click();
  }

async verifyInventoryPageLoaded() {
    await expect(this.productsHeader).toContainText('Swag Labs');
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  // Sort products
  async sortProducts(option) {
    await this.sortDropdown.selectOption(option);
    await this.page.waitForTimeout(1000); // Temporary wait for sorting
  }

    async openAndCloseMenu() {
    await this.menuButton.click();
    await this.closeMenuButton.click();
  }

  // Add Bike Light directly from inventory (without entering detail page)
  async addBikeLightToCart() {
    await this.bikeLightAddToCart.click();
  }

  // Go to cart
  async goToCart() {
    await this.shoppingCartLink.click();
  }

  // Get cart count
  async getCartCount() {
    if (await this.shoppingCartBadge.isVisible()) {
      return await this.shoppingCartBadge.textContent();
    }
    return '0';
  }
}

module.exports = { InventoryPage };