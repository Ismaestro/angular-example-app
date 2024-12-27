import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { LOCAL_STORAGE } from '~core/providers/local-storage';

// Keep these constants in sync with the code in index.html
const DARK_THEME_CLASS_NAME = 'theme-dark--mode',
  LIGHT_THEME_CLASS_NAME = 'theme-light--mode',
  PREFERS_COLOR_SCHEME_DARK = '(prefers-color-scheme: dark)',
  THEME_PREFERENCE_LOCAL_STORAGE_KEY = 'themePreference';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
  AUTO = 'auto',
}

function preferredScheme(): Theme.DARK | Theme.LIGHT {
  return globalThis.matchMedia(PREFERS_COLOR_SCHEME_DARK).matches ? Theme.DARK : Theme.LIGHT;
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

  private loadThemePreference(): void {
    const savedUserPreference = this.getThemeFromLocalStorageValue(),
      useTheme = savedUserPreference ?? Theme.DARK;

    this.theme.set(useTheme);
    this.setThemeBodyClasses(useTheme === Theme.AUTO ? preferredScheme() : useTheme);
  }

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
    if (this.theme() !== null) {
      this.localStorage?.setItem(THEME_PREFERENCE_LOCAL_STORAGE_KEY, this.theme()!);
    }
  }

  private watchPreferredColorScheme() {
    globalThis.matchMedia(PREFERS_COLOR_SCHEME_DARK).addEventListener('change', (event) => {
      const scheme = event.matches ? Theme.DARK : Theme.LIGHT;
      this.setThemeBodyClasses(scheme);
    });
  }

  getThemeFromLocalStorageValue(): Theme | null {
    const theme = this.localStorage?.getItem(THEME_PREFERENCE_LOCAL_STORAGE_KEY) as Theme | null;
    return theme ?? null;
  }
}
