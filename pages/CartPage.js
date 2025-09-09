const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.yourCartHeader = page.locator('[data-test="secondary-header"]');
    this.cartList = page.locator('[data-test="cart-list"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
  async verifyCartPageLoaded() {
    await expect(this.yourCartHeader).toContainText('Your Cart');
  }

  async verifyCartItem(productName, descriptionSnippet, price) {
    await expect(this.cartList).toContainText(productName);
        if (descriptionSnippet) {
         await expect(this.cartList).toContainText(descriptionSnippet);
    }
    await expect(this.cartList).toContainText(price);
  }
}

module.exports = { CartPage };