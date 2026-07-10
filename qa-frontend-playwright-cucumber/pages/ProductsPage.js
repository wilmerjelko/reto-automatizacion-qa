export class ProductsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  async getTitle() {
    return await this.title.textContent();
  }

  async addProductToCart(productName) {
    const dataTestName = `add-to-cart-${productName.toLowerCase().replace(/ /g, '-')}`;
    await this.page.locator(`[data-test="${dataTestName}"]`).click();
  }

  async removeProductFromCart(productName) {
    const dataTestName = `remove-${productName.toLowerCase().replace(/ /g, '-')}`;
    await this.page.locator(`[data-test="${dataTestName}"]`).click();
  }

  async getCartBadgeCount() {
    if (await this.shoppingCartBadge.isVisible()) {
      return await this.shoppingCartBadge.textContent();
    }
    return '0';
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }
}
