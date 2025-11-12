import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env['CI'];

export default defineConfig({
  testDir: './e2e/tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  retries: isCI ? 2 : 0,
  fullyParallel: true,
  reporter: [['list'], ['html', { open: isCI ? 'never' : 'on-failure' }]],
  use: {
    baseURL: process.env['BASE_URL'] || 'https://angular-example-app.netlify.app',
    headless: true,
    screenshot: isCI ? 'off' : 'only-on-failure',
    video: isCI ? 'off' : 'retain-on-failure',
    trace: isCI ? 'on-first-retry' : 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  outputDir: './e2e/results',
  metadata: {
    project: {
      name: 'Angular Example App',
    },
    build: process.env['GITHUB_RUN_NUMBER'] || 'local',
    branch: process.env['GITHUB_REF_NAME'] || 'dev',
  },
});
