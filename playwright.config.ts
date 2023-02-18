import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './playwright',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  forbidOnly: true,
  retries: 2,
  workers: 1,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Google Chrome',
      use: {
        channel: 'chrome',
      },
    },
    {
      name: 'Firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'Safari',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    {
      name: 'Microsoft Edge',
      use: {
        channel: 'msedge',
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
      },
    },
  ],
};

export default config;
