
import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  get productNames() {
    return this.page.locator('[data-test="inventory-item-name"]');
  }

  async checkout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}
