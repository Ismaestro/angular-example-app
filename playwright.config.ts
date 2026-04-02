import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/tests',
  timeout: 30_000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env['BASE_URL'] ?? 'http://localhost:4200',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
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
    build: process.env['GITHUB_RUN_NUMBER'] ?? 'local',
    branch: process.env['GITHUB_REF_NAME'] ?? 'dev',
  },
});
