import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import type { Locator } from 'playwright';
import { HeaderComponent } from './header.ps';

export class HomePage {
  readonly header: HeaderComponent;
  private readonly title: Locator;

  // eslint-disable-next-line @typescript-eslint/parameter-properties
  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.title = page.locator('h1');
  }

  async goto() {
    await this.page.goto('/');
  }

  async expectLoaded() {
    await expect(this.title).toContainText('Angular Example App');
  }

  async expectNavigationToLogin() {
    await expect(this.page).toHaveURL(/auth\/log-in$/u);
    await expect(this.page.locator('[data-testid="login-title"]')).toBeVisible();
  }

  async expectNavigationToRegister() {
    await expect(this.page).toHaveURL(/auth\/register$/u);
    await expect(this.page.locator('[data-testid="register-title"]')).toBeVisible();
  }
}
