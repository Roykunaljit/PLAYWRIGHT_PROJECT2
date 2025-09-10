class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded'});
    await this.page.waitForLoadState('networkidle');
  }

  async goBack() {
    await this.page.goBack();
  }

  async goForward() {
    await this.page.goForward();
  }

  async reload() {
    await this.page.reload();
  }

  async waitForURL(url) {
    await this.page.waitForURL(url);
  }
}

module.exports = { BasePage };