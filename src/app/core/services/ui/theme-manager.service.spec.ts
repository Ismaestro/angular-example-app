import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeManagerService } from './theme-manager.service';
import { Theme } from '~core/enums/theme.enums';
import {
  DARK_THEME_CLASS_NAME as DARK_THEME_CLASS,
  LIGHT_THEME_CLASS_NAME as LIGHT_THEME_CLASS,
  THEME_SELECTED_LOCAL_STORAGE_KEY,
} from '~core/constants/theme.constants';
import { LOCAL_STORAGE } from '~core/providers/local-storage';

/* eslint-disable unicorn/no-keyword-prefix */
describe('ThemeManagerService', () => {
  let service: ThemeManagerService;
  let mockDocument: {
    documentElement: {
      classList: {
        add: ReturnType<typeof vi.fn>;
        remove: ReturnType<typeof vi.fn>;
      };
    };
  };
  let mockLocalStorage: {
    getItem: ReturnType<typeof vi.fn>;
    setItem: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockDocument = {
      documentElement: {
        classList: {
          add: vi.fn(),
          remove: vi.fn(),
        },
      },
    };

    mockLocalStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        ThemeManagerService,
        { provide: DOCUMENT, useValue: mockDocument },
        { provide: LOCAL_STORAGE, useValue: mockLocalStorage },
      ],
    });
  });

  it('should be created and initialize from localStorage if present', () => {
    mockLocalStorage.getItem.mockReturnValue(Theme.LIGHT);
    service = TestBed.inject(ThemeManagerService);

    expect(service.themeSelected()).toBe(Theme.LIGHT);
    expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith(LIGHT_THEME_CLASS);
  });

  it('should initialize with default Theme.DARK if localStorage is empty', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    service = TestBed.inject(ThemeManagerService);

    // Note: The service sets the default signal value to DARK, but it only calls setTheme if found in localStorage during constructor.
    // Wait, let's re-read the constructor.
    // if (themeFromLocalStorage) { this.setTheme(themeFromLocalStorage); }
    // So if null, it stays Theme.DARK (initial value), but setBodyClasses is NOT called in constructor if null.
    expect(service.themeSelected()).toBe(Theme.DARK);
  });

  describe('setTheme', () => {
    beforeEach(() => {
      service = TestBed.inject(ThemeManagerService);
    });

    it('should set DARK theme', () => {
      service.setTheme(Theme.DARK);

      expect(service.themeSelected()).toBe(Theme.DARK);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        THEME_SELECTED_LOCAL_STORAGE_KEY,
        Theme.DARK,
      );
      expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith(DARK_THEME_CLASS);
      expect(mockDocument.documentElement.classList.remove).toHaveBeenCalledWith(LIGHT_THEME_CLASS);
    });

    it('should set LIGHT theme', () => {
      service.setTheme(Theme.LIGHT);

      expect(service.themeSelected()).toBe(Theme.LIGHT);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        THEME_SELECTED_LOCAL_STORAGE_KEY,
        Theme.LIGHT,
      );
      expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith(LIGHT_THEME_CLASS);
      expect(mockDocument.documentElement.classList.remove).toHaveBeenCalledWith(DARK_THEME_CLASS);
    });
  });
});
