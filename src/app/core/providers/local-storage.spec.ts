import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { LOCAL_STORAGE } from './local-storage';

describe('LOCAL_STORAGE token', () => {
  let originalLocalStorage: Storage;

  beforeEach(() => {
    originalLocalStorage = globalThis.localStorage;
  });

  afterEach(() => {
    Object.defineProperty(globalThis, 'localStorage', {
      value: originalLocalStorage,
      configurable: true,
    });
  });

  const setupBrowser = () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    });

    return TestBed.inject(LOCAL_STORAGE);
  };

  const setupServer = () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    });

    return TestBed.inject(LOCAL_STORAGE);
  };

  describe('platform behaviour', () => {
    it('should provide storage in browser', () => {
      const storage = setupBrowser();
      expect(storage).not.toBeNull();
    });

    it('should return null in server', () => {
      const storage = setupServer();
      expect(storage).toBeNull();
    });
  });

  describe('normal operations', () => {
    it('should set and get values', () => {
      const storage = setupBrowser();
      storage!.setItem('a', '1');

      expect(storage!.getItem('a')).toBe('1');
      expect(localStorage.getItem('a')).toBe('1');
    });

    it('should remove values', () => {
      const storage = setupBrowser();
      storage!.setItem('a', '1');

      storage!.removeItem('a');

      expect(storage!.getItem('a')).toBeNull();
    });

    it('should clear values', () => {
      const storage = setupBrowser();
      storage!.setItem('a', '1');
      storage!.setItem('b', '2');

      storage!.clear();

      expect(storage!.length).toBe(0);
    });

    it('should return correct length', () => {
      const storage = setupBrowser();
      storage!.clear();

      storage!.setItem('a', '1');
      storage!.setItem('b', '2');

      expect(storage!.length).toBe(2);
    });

    it('should return key by index', () => {
      const storage = setupBrowser();
      storage!.clear();

      storage!.setItem('a', '1');

      expect(storage!.key(0)).toBe('a');
    });
  });

  describe('error handling (catch branches)', () => {
    it('should return null when getItem throws', () => {
      vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
        throw new Error('boom');
      });

      const storage = setupBrowser();
      expect(storage!.getItem('x')).toBeNull();
    });

    /* eslint-disable @typescript-eslint/strict-void-return */
    it('should return null when key throws', () => {
      const mockStorage: Storage = {
        length: 1,
        clear: vi.fn().mockImplementation(() => undefined),
        getItem: vi.fn().mockImplementation(() => null),
        key: vi.fn().mockImplementation(() => {
          throw new Error('boom');
        }),
        removeItem: vi.fn().mockImplementation(() => undefined),
        setItem: vi.fn().mockImplementation(() => undefined),
      };
      /* eslint-enable @typescript-eslint/strict-void-return */

      Object.defineProperty(globalThis, 'localStorage', {
        value: mockStorage,
        configurable: true,
      });

      const storage = setupBrowser();

      expect(storage!.key(0)).toBeNull();
    });

    it('should return 0 when length throws', () => {
      const mockStorage = {
        clear: vi.fn().mockImplementation(() => undefined),
        getItem: vi.fn().mockImplementation(() => null),
        key: vi.fn().mockImplementation(() => null),
        removeItem: vi.fn().mockImplementation(() => undefined),
        setItem: vi.fn().mockImplementation(() => undefined),
      } as unknown as Storage;

      Object.defineProperty(mockStorage, 'length', {
        get: () => {
          throw new Error('boom');
        },
      });

      Object.defineProperty(globalThis, 'localStorage', {
        value: mockStorage,
        configurable: true,
      });

      const storage = setupBrowser();

      expect(storage!.length).toBe(0);
    });

    it('should not throw when setItem fails', () => {
      vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
        throw new Error('boom');
      });

      const storage = setupBrowser();

      expect(() => {
        storage!.setItem('a', '1');
      }).not.toThrow();
    });

    it('should not throw when removeItem fails', () => {
      vi.spyOn(localStorage, 'removeItem').mockImplementation(() => {
        throw new Error('boom');
      });

      const storage = setupBrowser();

      expect(() => {
        storage!.removeItem('a');
      }).not.toThrow();
    });

    it('should not throw when clear fails', () => {
      vi.spyOn(localStorage, 'clear').mockImplementation(() => {
        throw new Error('boom');
      });

      const storage = setupBrowser();

      expect(() => {
        storage!.clear();
      }).not.toThrow();
    });
  });
});
