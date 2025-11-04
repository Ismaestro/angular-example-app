import { test } from '../fixtures/base.fixture';
import { HomePage } from '../pages/home.po';

test.describe('Home page', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
  });

  test('displays main title and navigation links', async () => {
    await home.expectLoaded();
    await home.header.expectLinksVisible();
  });

  test('navigates to the login page from the header', async () => {
    await home.header.signInLink.click();
    await home.expectNavigationToLogin();
  });

  test('navigates to the register page from the header', async () => {
    await home.header.signUpLink.click();
    await home.expectNavigationToRegister();
  });
});
