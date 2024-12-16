import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
} from '@angular/core';
import { AUTH_URLS, POKEMON_URLS, ROOT_URLS, USER_URLS } from '~core/constants/urls.constants';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FirstTitleCasePipe } from '~core/pipes/first-title-case.pipe';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { PokemonSearchComponent } from '~features/pokemon-detail/components/pokemon-search/pokemon-search.component';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import type { Pokemon } from '~features/pokemon-detail/types/pokemon.type';
import { LanguageSelectorComponent } from '~core/components/language-selector/language-selector.component';
import { ThemeButtonComponent } from '~core/components/theme-button/theme-button.component';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    FirstTitleCasePipe,
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
  readonly ROOT_URLS = ROOT_URLS;
  readonly AUTH_URLS = AUTH_URLS;
  readonly USER_URLS = USER_URLS;

  isUserLoggedIn = this.authenticationService.isUserLoggedIn();
  menuOpen = false;
  pokemonLoaded: Pokemon | undefined;
  pokemonLoading = false;
  pokemonLoadedRoute = '';

  constructor() {
    effect(() => {
      this.isUserLoggedIn = this.authenticationService.isUserLoggedIn();
    });
  }

  logoutUser() {
    this.pokemonLoaded = undefined;
    this.authenticationService.logOut();
    void this.router.navigate([ROOT_URLS.home]);
  }

  loadPokemonLink(event: unknown) {
    this.pokemonLoaded = event as Pokemon;
    const pokemonName = this.pokemonLoaded.name;
    if (pokemonName) {
      this.pokemonLoadedRoute = POKEMON_URLS.detail(pokemonName);
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
