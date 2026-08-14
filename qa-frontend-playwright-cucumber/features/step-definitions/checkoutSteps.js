import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { ProductsPage } from '../../pages/ProductsPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { CheckoutPage } from '../../pages/CheckoutPage.js';

Given('que el usuario inicia sesión con credenciales válidas y está en la página de productos', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
  await this.loginPage.loginAsStandardUser();
  this.productsPage = new ProductsPage(this.page);
  const title = await this.productsPage.getTitle();
  expect(title).toBe('Products');
});

When('el usuario agrega el producto {string} al carrito', async function (productName) {
  await this.productsPage.addProductToCart(productName);
});

Then('el carrito debería mostrar {string} productos en la insignia', async function (badgeCount) {
  const count = await this.productsPage.getCartBadgeCount();
  expect(count).toBe(badgeCount);
});

When('el usuario va al carrito de compras', async function () {
  await this.productsPage.goToCart();
  this.cartPage = new CartPage(this.page);
});

When('el usuario elimina el producto {string} del carrito', async function (productName) {
  await this.cartPage.removeProduct(productName);
});

Then('el carrito debería contener {int} producto(s)', async function (expectedCount) {
  await expect(this.cartPage.cartItems).toHaveCount(expectedCount);
});

Then('debería ver los productos {string} y {string} en la lista', async function (prod1, prod2) {
  const items = await this.cartPage.getProductNames();
  expect(items).toContain(prod1);
  expect(items).toContain(prod2);
});

Then('debería ver el producto {string} en la lista', async function (productName) {
  const items = await this.cartPage.getProductNames();
  expect(items).toContain(productName);
});

When('el usuario avanza al checkout', async function () {
  await this.cartPage.proceedToCheckout();
  this.checkoutPage = new CheckoutPage(this.page);
});

When('el usuario completa la información con nombre {string}, apellido {string} y código postal {string}', async function (firstName, lastName, postalCode) {
  await this.checkoutPage.fillInformation(firstName, lastName, postalCode);
});

When('el usuario finaliza la compra', async function () {
  await this.checkoutPage.finishPurchase();
});

Then('debería ver el error de checkout {string}', async function (expectedMessage) {
  const actualMessage = await this.checkoutPage.getErrorMessage();
  expect(actualMessage).toBe(expectedMessage);
});

Then('debería ver el mensaje de confirmación {string}', async function (expectedHeader) {
  const actualHeader = await this.checkoutPage.getCompleteHeader();
  expect(actualHeader).toBe(expectedHeader);
});
