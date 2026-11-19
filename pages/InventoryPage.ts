
import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addProducts() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  }

  get cartBadge() {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  async openCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}
