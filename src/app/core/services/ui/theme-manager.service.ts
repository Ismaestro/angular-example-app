import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { LOCAL_STORAGE } from '~core/providers/local-storage';

// Keep these constants in sync with the code in index.html
const DARK_THEME_CLASS_NAME = 'theme-dark--mode',
  LIGHT_THEME_CLASS_NAME = 'theme-light--mode',
  THEME_SELECTED_LOCAL_STORAGE_KEY = 'theme';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeManagerService {
  private readonly document = inject(DOCUMENT);
  private readonly localStorage: Storage | null = inject(LOCAL_STORAGE);
  private readonly _themeSelected = signal<Theme>(Theme.DARK);

  readonly themeSelected = this._themeSelected.asReadonly();

  constructor() {
    const themeFromLocalStorage = this.localStorage?.getItem(
      THEME_SELECTED_LOCAL_STORAGE_KEY,
    ) as Theme | null;
    if (themeFromLocalStorage) {
      this.setTheme(themeFromLocalStorage);
    }
  }

  setTheme(theme: Theme): void {
    this._themeSelected.set(theme);
    this.localStorage?.setItem(THEME_SELECTED_LOCAL_STORAGE_KEY, this.themeSelected());
    this.setBodyClasses();
  }

  private setBodyClasses(): void {
    const documentClassList = this.document.documentElement.classList;
    if (this.themeSelected() === Theme.DARK) {
      documentClassList.add(DARK_THEME_CLASS_NAME);
      documentClassList.remove(LIGHT_THEME_CLASS_NAME);
    } else {
      documentClassList.add(LIGHT_THEME_CLASS_NAME);
      documentClassList.remove(DARK_THEME_CLASS_NAME);
    }
  }
}
