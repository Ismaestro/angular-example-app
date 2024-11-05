import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { AUTH_URLS, ROOT_URLS, USER_URLS } from '~modules/shared/consts/urls.consts';
import { translations } from '../../../../../locale/translations';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '~modules/auth/shared/auth.service';
import { FirstTitleCasePipe } from '~modules/shared/pipes/first-title-case.pipe';
import { PokemonSearchComponent } from '~modules/pokemon/shared/components/pokemon-search/pokemon-search.component';

enum NavItemType {
  LINK = 'LINK',
  BUTTON = 'BUTTON',
  INPUT = 'INPUT',
}

interface NavItem {
  id: string;
  type: NavItemType;
  text: string;
  isUserRequired?: boolean;
  url?: string;
  click?: () => void;
  change?: (value: string) => void;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, FirstTitleCasePipe, PokemonSearchComponent],
})
export class HeaderComponent {
  router = inject(Router);
  authService = inject(AuthService);

  navItemType = NavItemType;
  isUserLoggedIn = false;
  navItems: NavItem[] = [
    {
      id: 'home',
      url: ROOT_URLS.home,
      text: translations.home,
      type: NavItemType.LINK,
    },
    {
      id: 'login',
      url: AUTH_URLS.logIn,
      text: translations.logIn,
      isUserRequired: false,
      type: NavItemType.LINK,
    },
    {
      id: 'register',
      url: AUTH_URLS.register,
      text: translations.register,
      isUserRequired: false,
      type: NavItemType.LINK,
    },
    {
      id: 'dashboard',
      url: USER_URLS.dashboard,
      text: translations.dashboard,
      isUserRequired: true,
      type: NavItemType.LINK,
    },
    {
      id: 'logout',
      isUserRequired: true,
      click: () => {
        this.authService.logOut();
        this.router.navigate([ROOT_URLS.home]);
      },
      text: translations.logout,
      type: NavItemType.BUTTON,
    },
    {
      id: 'search',
      isUserRequired: false,
      change: (pokemonName: string) => {
        console.log('pokemon search', pokemonName);
      },
      text: translations.logout,
      type: NavItemType.INPUT,
    },
  ];

  constructor() {
    effect(() => {
      this.isUserLoggedIn = this.authService.isUserLoggedIn();
    });
  }
}
