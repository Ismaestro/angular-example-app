import type { Page } from '@playwright/test';
import { test as base } from '@playwright/test';

type AppFixtures = {
  page: Page;
};

export const test = base.extend<AppFixtures>({});

export { expect } from '@playwright/test';
