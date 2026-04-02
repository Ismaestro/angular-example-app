import { DOCUMENT, inject, Injectable, signal } from '@angular/core';
import { LOCAL_STORAGE } from '~core/providers/local-storage';
import { Theme } from '~core/enums/theme.enums';
import {
  DARK_THEME_CLASS_NAME,
  LIGHT_THEME_CLASS_NAME,
  THEME_SELECTED_LOCAL_STORAGE_KEY,
} from '~core/constants/theme.constants';

@Injectable({
  providedIn: 'root',
})
export class ThemeManagerService {
  private readonly document = inject(DOCUMENT);
  private readonly localStorage: Storage | null = inject(LOCAL_STORAGE);
  private readonly _themeSelected = signal<Theme>(
    (this.localStorage?.getItem(THEME_SELECTED_LOCAL_STORAGE_KEY) as Theme | null) ?? Theme.DARK,
  );

  readonly themeSelected = this._themeSelected.asReadonly();

  constructor() {
    this.setBodyClasses();
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
