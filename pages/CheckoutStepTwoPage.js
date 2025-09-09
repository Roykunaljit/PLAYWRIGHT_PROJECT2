const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class CheckoutStepTwoPage extends BasePage {
  constructor(page) {
    super(page);
    this.finishButton = page.locator('[data-test="finish"]');
    this.overviewHeader = page.locator('[data-test="secondary-header"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.cancelButton = page.locator('[data-test="cancel"]');


  }

  async clickFinish() {
    await this.finishButton.click();
  }
    async verifyOverviewPage() {
    await expect(this.overviewHeader).toContainText('Checkout: Overview');
  }
    async verifyOrderSummary(subtotal, tax, total) {
    await expect(this.subtotalLabel).toContainText(subtotal);
    await expect(this.taxLabel).toContainText(tax);
    await expect(this.totalLabel).toContainText(total);
  }
}

module.exports = { CheckoutStepTwoPage };