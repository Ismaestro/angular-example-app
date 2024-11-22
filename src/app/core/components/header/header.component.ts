import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
} from '@angular/core';
import { POKEMON_URLS, ROOT_URLS } from '~core/consts/urls.consts';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FirstTitleCasePipe } from '~core/pipes/first-title-case.pipe';
import { NgOptimizedImage } from '@angular/common';
import {
  HEADER_NAV_ITEMS,
  NavItem,
  NavItemId,
  NavItemType,
} from '~core/components/header/header.const';
import { PokemonSearchComponent } from '~features/pokemon-detail/components/pokemon-search/pokemon-search.component';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { Pokemon } from '~features/pokemon-detail/types/pokemon.type';
import { Theme, ThemeManagerService } from '~core/services/theme-manager.service';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { LanguageSelectorComponent } from '~core/components/language-selector/language-selector.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    FirstTitleCasePipe,
    PokemonSearchComponent,
    NgOptimizedImage,
    LanguageSelectorComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly themeManagerService = inject(ThemeManagerService);

  readonly Theme = Theme;
  readonly ROOT_URLS = ROOT_URLS;
  readonly navItemType = NavItemType;
  readonly navItems: NavItem[] = HEADER_NAV_ITEMS;

  isUserLoggedIn = this.authenticationService.isUserLoggedIn();
  menuOpen = false;
  pokemonLoaded: Pokemon | undefined;
  pokemonLoading = false;
  pokemonLoadedRoute = '';
  themeSelected = this.themeManagerService.getThemeFromLocalStorageValue();

  constructor() {
    effect(() => {
      this.isUserLoggedIn = this.authenticationService.isUserLoggedIn();
    });

    this.findNavItem(NavItemId.LOGOUT)!.click = this.logoutUser.bind(this);
    this.findNavItem(NavItemId.SEARCH)!.change = this.loadPokemonLink.bind(this);
  }

  private findNavItem(id: NavItemId) {
    return this.navItems.find((item) => item.id === id);
  }

  private logoutUser() {
    this.pokemonLoaded = undefined;
    this.authenticationService.logOut();
    this.router.navigate([ROOT_URLS.home]);
  }

  private loadPokemonLink(event: unknown) {
    this.pokemonLoaded = event as Pokemon;
    const pokemonName = this.pokemonLoaded.name;
    if (pokemonName) {
      this.pokemonLoadedRoute = POKEMON_URLS.detail(pokemonName);
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleTheme() {
    this.themeSelected =
      this.themeManagerService.getThemeFromLocalStorageValue() === Theme.DARK || !this.themeSelected
        ? Theme.LIGHT
        : Theme.DARK;
    this.themeManagerService.setTheme(this.themeSelected);
  }
}
