export class ProductsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.inventoryItems = page.locator('.inventory_item');
  }

  /**
   * Traduce el nombre visible de un producto al sufijo usado por los
   * atributos `data-test` de Sauce Demo.
   * Ej: "Sauce Labs Backpack" -> "sauce-labs-backpack"
   */
  static toDataTestSuffix(productName) {
    return productName.toLowerCase().replace(/ /g, '-');
  }

  async getTitle() {
    return await this.title.textContent();
  }

  async addProductToCart(productName) {
    const suffix = ProductsPage.toDataTestSuffix(productName);
    await this.page.locator(`[data-test="add-to-cart-${suffix}"]`).click();
  }

  async removeProductFromCart(productName) {
    const suffix = ProductsPage.toDataTestSuffix(productName);
    await this.page.locator(`[data-test="remove-${suffix}"]`).click();
  }

  async getCartBadgeCount() {
    if (await this.shoppingCartBadge.isVisible()) {
      return await this.shoppingCartBadge.textContent();
    }
    return '0';
  }

  async getProductCount() {
    return await this.inventoryItems.count();
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
