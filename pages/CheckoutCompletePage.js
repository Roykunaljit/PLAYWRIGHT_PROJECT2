const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class CheckoutCompletePage extends BasePage {
  constructor(page) {
    super(page);
    this.completeHeader = page.locator('[data-test="secondary-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.thankYouMessage = page.locator('[data-test="complete-header"]')
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async clickBackHome() {
    await this.backHomeButton.click();
  }
    async verifyCompletePage() {
    await expect(this.completeHeader).toContainText('Checkout: Complete!');
    await expect(this.thankYouMessage).toContainText('Thank you for your order!');
    await expect(this.completeText).toContainText('Your order has been dispatched');
    await expect(this.backHomeButton).toContainText('Back Home');
  }
}

module.exports = { CheckoutCompletePage };