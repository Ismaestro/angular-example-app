import { expect, test } from '../fixtures/base.fixture';
import { HomePage } from '../pages/home.po';

test.describe('Visual Regression Testing', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
  });

  test('home page should match snapshot', async ({ page }) => {
    await home.expectLoaded();

    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('home-page.png', {
      fullPage: true,
      mask: [],
    });
  });

  test('header should match snapshot', async ({ page }) => {
    await home.expectLoaded();

    const header = page.locator('app-header');
    await expect(header).toHaveScreenshot('header-component.png');
  });

  test('log-in page should match snapshot', async ({ page }) => {
    await home.header.signInLink.click();
    await page.waitForURL('**/auth/log-in');

    await expect(page.locator('form')).toBeVisible();

    await expect(page).toHaveScreenshot('log-in-page.png', { fullPage: true });
  });
});
