import { expect, test } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('Accessibility (A11y) Audits', () => {
  const pagesToTest = [
    { name: 'Home', path: '/' },
    { name: 'Log In', path: '/auth/log-in' },
    { name: 'Register', path: '/auth/register' },
    { name: 'My Account (Unauthorized)', path: '/auth/my-account' },
    { name: 'Pokedex', path: '/' }, // Since home is the pokedex in this app structure usually
    { name: 'Not Found', path: '/error/404' },
  ];

  for (const pageInfo of pagesToTest) {
    test(`Page: ${pageInfo.name} should not have any accessibility violations`, async ({
      page,
    }) => {
      await page.goto(pageInfo.path);

      // Wait for the page to be stable (shoelace components might need a moment)
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        .exclude('sl-button')
        .exclude('sl-input')
        .exclude('sl-dropdown')
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
