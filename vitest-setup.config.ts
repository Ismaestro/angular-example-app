/* eslint-disable @typescript-eslint/no-empty-function */
// eslint-disable-next-line max-classes-per-file
import { afterEach, beforeEach, expect, vi } from 'vitest';

/**
 * Purpose:
 * Keep our test runs clean and trustworthy.
 *
 * Why this exists:
 * - We want tests to fail when something logs an unexpected warning or error.
 * - We silence one known, harmless warning from Lit so it doesn’t cause noise.
 *
 * Result:
 * Clearer test output and fewer false positives, while still catching real issues.
 */

type SpyWithRestore = { mockRestore: () => void };
type ConsoleType = 'stdout' | 'stderr';

const ALLOW_WARN_PATTERNS: readonly RegExp[] = [/lit is in dev mode/iu];

let errorSpy: ReturnType<typeof vi.spyOn>;
let warnSpy: ReturnType<typeof vi.spyOn>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const shouldAllow = (message: string, _type: ConsoleType): boolean =>
  ALLOW_WARN_PATTERNS.some((pattern) => pattern.test(message));

// Mock ResizeObserver for tests
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

beforeEach(() => {
  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }

  Object.defineProperty(globalThis, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });

  errorSpy = vi.spyOn(console, 'error').mockImplementation((...arguments_: readonly unknown[]) => {
    const message = arguments_.map(String).join(' ');
    throw new Error(`Console Error Intercept: ${message}`);
  });

  warnSpy = vi.spyOn(console, 'warn').mockImplementation((...arguments_: readonly unknown[]) => {
    const message = arguments_.map(String).join(' ');
    if (shouldAllow(message, 'stderr')) {
      return;
    }
    throw new Error(`Console Warn Intercept: ${message}`);
  });
});

afterEach(() => {
  (errorSpy as unknown as SpyWithRestore).mockRestore();
  (warnSpy as unknown as SpyWithRestore).mockRestore();
  expect(errorSpy).not.toHaveBeenCalled();
});
