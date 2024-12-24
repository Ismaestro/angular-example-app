import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
} from '@angular/core';
import { AUTH_URLS, ROOT_URLS } from '~core/constants/urls.constants';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { PokemonSearchComponent } from '~features/pokemon/components/pokemon-search/pokemon-search.component';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { LanguageSelectorComponent } from '~core/components/language-selector/language-selector.component';
import { ThemeButtonComponent } from '~core/components/theme-button/theme-button.component';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import { ROOT_PATHS } from '~core/constants/paths.constants';
import { clearCache } from '~core/interceptors/caching.interceptor';
import { translations } from '../../../../locale/translations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    PokemonSearchComponent,
    NgOptimizedImage,
    LanguageSelectorComponent,
    NgTemplateOutlet,
    ThemeButtonComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent {
  private readonly authenticationService = inject(AuthenticationService);

  readonly router = inject(Router);
  readonly ROOT_PATHS = ROOT_PATHS;
  readonly ROOT_URLS = ROOT_URLS;
  readonly AUTH_URLS = AUTH_URLS;
  readonly translations = translations;

  isUserLoggedIn = this.authenticationService.isUserLoggedIn();
  menuOpen = false;

  constructor() {
    effect(() => {
      this.isUserLoggedIn = this.authenticationService.isUserLoggedIn();
    });
  }

  logOutUser() {
    this.authenticationService.logOut();
    clearCache();
    void this.router.navigate([ROOT_URLS.home]);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
