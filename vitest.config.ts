// Learn more about Vitest configuration options at https://vitest.dev/config/
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['vitest-setup.config.ts'],
    coverage: {
      reportsDirectory: 'coverage',
      exclude: ['**/*.html'],
    },
    globals: true,
  },
});
