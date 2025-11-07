import type { ElementRef, Signal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { AUTH_URLS, ROOT_URLS, USER_URLS } from '~core/constants/urls.constants';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { LanguageSelectorComponent } from '~shared/components/language-selector/language-selector.component';
import { ThemeButtonComponent } from '~shared/components/theme-button/theme-button.component';
import type { SlDropdown } from '@shoelace-style/shoelace';
import { PokemonSearchInputComponent } from '~shared/components/pokemon-search-input/pokemon-search-input.component';
import { translations } from '~locale/translations';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    LanguageSelectorComponent,
    NgTemplateOutlet,
    ThemeButtonComponent,
    PokemonSearchInputComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);

  readonly USER_URLS = USER_URLS;
  readonly ROOT_URLS = ROOT_URLS;
  readonly AUTH_URLS = AUTH_URLS;
  readonly translations = translations;
  readonly avatarDropdown: Signal<ElementRef<SlDropdown> | undefined> = viewChild('avatarDropdown');
  readonly isUserLoggedIn = () => this.authenticationService.authState().isLoggedIn;
  readonly menuOpen = signal(false);

  logOutUser() {
    this.closeMenu();
    this.authenticationService.logOut();
    void this.router.navigate([ROOT_URLS.home]);
  }

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  closeMenu() {
    void this.avatarDropdown()?.nativeElement.hide();
    this.menuOpen.set(false);
  }
}
