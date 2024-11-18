import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { LOCAL_STORAGE } from '~core/providers/local-storage';

// Keep these constants in sync with the code in index.html
const THEME_PREFERENCE_LOCAL_STORAGE_KEY = 'themePreference';
const DARK_THEME_CLASS_NAME = 'theme-dark--mode';
const LIGHT_THEME_CLASS_NAME = 'theme-light--mode';
const PREFERS_COLOR_SCHEME_DARK = '(prefers-color-scheme: dark)';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
  AUTO = 'auto',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeManagerService {
  private readonly document = inject(DOCUMENT);
  private readonly localStorage: Storage | null = inject(LOCAL_STORAGE);
  private readonly platformId = inject(PLATFORM_ID);

  readonly theme = signal<Theme | null>(this.getThemeFromLocalStorageValue());
  readonly themeChanged$ = new Subject<void>();

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.loadThemePreference();
    this.watchPreferredColorScheme();
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
    this.setThemeInLocalStorage();
    this.setThemeBodyClasses(theme === Theme.AUTO ? preferredScheme() : theme);
  }

  // 1. Read theme preferences stored in localStorage
  // 2. In case when there are no stored user preferences, then read them from device preferences.
  private loadThemePreference(): void {
    const savedUserPreference = this.getThemeFromLocalStorageValue();
    const useTheme = savedUserPreference ?? Theme.AUTO;

    this.theme.set(useTheme);
    this.setThemeBodyClasses(useTheme === Theme.AUTO ? preferredScheme() : useTheme);
  }

  // Set theme classes on the body element
  private setThemeBodyClasses(theme: Theme.DARK | Theme.LIGHT): void {
    const documentClassList = this.document.documentElement.classList;
    if (theme === Theme.DARK) {
      documentClassList.add(DARK_THEME_CLASS_NAME);
      documentClassList.remove(LIGHT_THEME_CLASS_NAME);
    } else {
      documentClassList.add(LIGHT_THEME_CLASS_NAME);
      documentClassList.remove(DARK_THEME_CLASS_NAME);
    }
    this.themeChanged$.next();
  }

  private setThemeInLocalStorage(): void {
    if (this.theme()) {
      this.localStorage?.setItem(THEME_PREFERENCE_LOCAL_STORAGE_KEY, this.theme()!);
    }
  }

  private watchPreferredColorScheme() {
    window.matchMedia(PREFERS_COLOR_SCHEME_DARK).addEventListener('change', event => {
      const scheme = event.matches ? Theme.DARK : Theme.LIGHT;
      this.setThemeBodyClasses(scheme);
    });
  }

  getThemeFromLocalStorageValue(): Theme | null {
    const theme = this.localStorage?.getItem(THEME_PREFERENCE_LOCAL_STORAGE_KEY) as Theme | null;
    return theme ?? null;
  }
}

function preferredScheme(): Theme.DARK | Theme.LIGHT {
  return window.matchMedia(PREFERS_COLOR_SCHEME_DARK).matches ? Theme.DARK : Theme.LIGHT;
}