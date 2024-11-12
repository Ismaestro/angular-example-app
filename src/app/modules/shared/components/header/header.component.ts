import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
} from '@angular/core';
import { POKEMON_URLS, ROOT_URLS } from '~modules/shared/consts/urls.consts';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '~modules/auth/shared/auth.service';
import { FirstTitleCasePipe } from '~modules/shared/pipes/first-title-case.pipe';
import { PokemonSearchComponent } from '~modules/pokemon/shared/components/pokemon-search/pokemon-search.component';
import { NgOptimizedImage } from '@angular/common';
import { Pokemon } from '~modules/pokemon/shared/pokemon.type';
import {
  HEADER_NAV_ITEMS,
  NavItem,
  NavItemId,
  NavItemType,
} from '~modules/shared/components/header/header.const';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent {
  router = inject(Router);
  authService = inject(AuthService);
  ROOT_URLS = ROOT_URLS;
  navItemType = NavItemType;
  isUserLoggedIn = this.authService.isUserLoggedIn();
  navItems: NavItem[] = HEADER_NAV_ITEMS;
  menuActive = false;
  pokemonLoaded: Pokemon | undefined;
  pokemonLoading = false;
  pokemonLoadedRoute = '';

  constructor() {
    effect(() => {
      this.isUserLoggedIn = this.authService.isUserLoggedIn();
    });

    this.findNavItem(NavItemId.LOGOUT)!.click = this.logoutUser.bind(this);
    this.findNavItem(NavItemId.SEARCH)!.change = this.loadPokemonLink.bind(this);
  }

  findNavItem(id: NavItemId) {
    return this.navItems.find(item => item.id === id);
  }

  logoutUser() {
    this.pokemonLoaded = undefined;
    this.authService.logOut();
    this.router.navigate([ROOT_URLS.home]);
  }

  loadPokemonLink(event: unknown) {
    this.pokemonLoaded = event as Pokemon;
    const pokemonName = this.pokemonLoaded.name;
    if (pokemonName) {
      this.pokemonLoadedRoute = POKEMON_URLS.detail(pokemonName);
    }
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
}
