
import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillCustomerDetails() {
    await this.page.locator('[data-test="firstName"]').fill('QA');
    await this.page.locator('[data-test="lastName"]').fill('Automation');
    await this.page.locator('[data-test="postalCode"]').fill('10001');
    await this.page.locator('[data-test="continue"]').click();
  }

  async finish() {
    await this.page.locator('[data-test="finish"]').click();
  }

  get confirmation() {
    return this.page.locator('[data-test="complete-header"]');
  }
}
