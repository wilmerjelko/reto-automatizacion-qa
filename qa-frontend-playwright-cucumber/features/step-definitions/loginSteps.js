import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { ProductsPage } from '../../pages/ProductsPage.js';

Given('que el usuario navega a la página de inicio de sesión', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
});

When('el usuario ingresa el usuario {string} y la contraseña {string}', async function (username, password) {
  await this.loginPage.usernameInput.fill(username);
  await this.loginPage.passwordInput.fill(password);
});

When('hace clic en el botón de login', async function () {
  await this.loginPage.loginButton.click();
});

When('el usuario cierra la sesión', async function () {
  await this.productsPage.logout();
});

Then('debería ingresar correctamente a la página de productos', async function () {
  this.productsPage = new ProductsPage(this.page);
  const title = await this.productsPage.getTitle();
  expect(title).toBe('Products');
});

Then('debería ver {int} productos disponibles en el catálogo', async function (expectedCount) {
  const count = await this.productsPage.getProductCount();
  expect(count).toBe(expectedCount);
});

Then('debería volver a la página de inicio de sesión', async function () {
  await expect(this.loginPage.loginButton).toBeVisible();
});

Then('debería ver un mensaje de error que dice {string}', async function (expectedMessage) {
  const actualMessage = await this.loginPage.getErrorMessage();
  expect(actualMessage).toBe(expectedMessage);
});

Then('debería ver un mensaje de error que contiene {string}', async function (partialMessage) {
  const actualMessage = await this.loginPage.getErrorMessage();
  expect(actualMessage).toContain(partialMessage);
});
