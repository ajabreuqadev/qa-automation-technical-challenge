
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('Completar compra de dos productos', async ({ page }) => {
  test.setTimeout(60000);

  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  // Iniciar sesion
  await login.open();
  await login.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory\.html/);

  // Seleccionar productos
  await inventory.addProducts();
  await expect(inventory.cartBadge).toHaveText('2');

  // Validar contenido del carrito
  await inventory.openCart();
  await expect(cart.productNames).toHaveText([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light'
  ]);

  // Completar compra
  await cart.checkout();
  await checkout.fillCustomerDetails();
  await expect(page).toHaveURL(/checkout-step-two\.html/);

  await checkout.finish();

  // Verificar confirmacion
  await expect(checkout.confirmation)
    .toHaveText('Thank you for your order!');
});
