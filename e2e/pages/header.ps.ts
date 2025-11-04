import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import type { Locator } from 'playwright';

export class HeaderComponent {
  readonly signInLink: Locator;
  readonly signUpLink: Locator;

  // eslint-disable-next-line @typescript-eslint/parameter-properties
  constructor(private readonly page: Page) {
    this.signInLink = this.page.getByRole('link', { name: 'Log in' });
    this.signUpLink = this.page.getByRole('link', { name: 'Register' });
  }

  async expectLinksVisible() {
    await expect(this.signInLink).toBeVisible();
    await expect(this.signUpLink).toBeVisible();
  }
}
