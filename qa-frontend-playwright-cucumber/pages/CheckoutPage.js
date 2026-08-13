export class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('.complete-header');
    this.errorMessage = page.locator('[data-test="error"]');
    this.totalLabel = page.locator('.summary_total_label');
  }

  /**
   * Completa el formulario de datos del comprador y avanza al resumen.
   * Los campos vacíos se omiten para poder validar los mensajes de campo requerido.
   */
  async fillInformation(firstName, lastName, postalCode) {
    if (firstName) await this.firstNameInput.fill(firstName);
    if (lastName) await this.lastNameInput.fill(lastName);
    if (postalCode) await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async finishPurchase() {
    await this.finishButton.click();
  }

  async getCompleteHeader() {
    return await this.completeHeader.textContent();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async getTotal() {
    return await this.totalLabel.textContent();
  }
}
