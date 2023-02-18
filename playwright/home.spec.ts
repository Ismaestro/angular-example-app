import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test('should load default route', async ({ page }) => {
    await page.goto('http://localhost:4200');
    await expect(page).toHaveURL('http://localhost:4200/auth/log-in');
  });
});
