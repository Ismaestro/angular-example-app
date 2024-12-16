import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { Theme, ThemeManagerService } from '~core/services/theme-manager.service';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

@Component({
  selector: 'app-theme-button',
  templateUrl: './theme-button.component.html',
  styleUrl: './theme-button.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ThemeButtonComponent {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly themeManagerService = inject(ThemeManagerService);

  readonly router = inject(Router);
  readonly Theme = Theme;

  isUserLoggedIn = this.authenticationService.isUserLoggedIn();
  themeSelected = this.themeManagerService.getThemeFromLocalStorageValue();

  constructor() {
    effect(() => {
      this.isUserLoggedIn = this.authenticationService.isUserLoggedIn();
    });
  }

  toggleTheme() {
    this.themeSelected =
      this.themeManagerService.getThemeFromLocalStorageValue() === Theme.DARK ||
      this.themeSelected === null
        ? Theme.LIGHT
        : Theme.DARK;
    this.themeManagerService.setTheme(this.themeSelected);
  }
}
