const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class CheckoutStepOnePage extends BasePage {
  constructor(page) {
    super(page);
    this.checkoutHeader = page.locator('[data-test="secondary-header"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
     this.cancelButton = page.locator('[data-test="cancel"]');
  }

  async fillInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }
    async verifyStepOnePage() {
    await expect(this.checkoutHeader).toContainText('Checkout: Your Information');
  }
}

module.exports = { CheckoutStepOnePage };