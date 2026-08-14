import { ProductsPage } from './ProductsPage.js';

export class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async getProductNames() {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async getItemCount() {
    return await this.cartItems.count();
  }

  async removeProduct(productName) {
    const suffix = ProductsPage.toDataTestSuffix(productName);
    await this.page.locator(`[data-test="remove-${suffix}"]`).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
