import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';
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

  readonly themeSelected = signal<Theme>(Theme.DARK);

  constructor() {
    effect(() => {
      this.localStorage?.setItem(THEME_SELECTED_LOCAL_STORAGE_KEY, this.themeSelected());
      this._setBodyClasses();
    });

    const themeFromLocalStorage = this.localStorage?.getItem(
      THEME_SELECTED_LOCAL_STORAGE_KEY,
    ) as Theme | null;
    if (themeFromLocalStorage) {
      this.themeSelected.set(themeFromLocalStorage);
    }
  }

  private _setBodyClasses(): void {
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
