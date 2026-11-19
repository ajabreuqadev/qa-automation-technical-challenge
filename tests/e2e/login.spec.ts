
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Login correcto', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('[data-test="title"]'))
    .toHaveText('Products');
});

test('Login con credenciales incorrectas', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login('usuario_incorrecto', 'password_incorrecta');

  await expect(loginPage.getErrorMessage())
    .toContainText('Username and password do not match');

  await expect(page).not.toHaveURL(/inventory\.html/);
});

