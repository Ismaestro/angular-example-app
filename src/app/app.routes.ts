import {
  AUTHENTICATION_PATHS,
  ERROR_PATHS,
  POKEMON_PATHS,
  ROOT_PATHS,
  USER_PATHS,
} from '~core/constants/paths.constants';
import type { Route } from '@angular/router';
import { HomeComponent } from '~features/home/home.component';
import { ERROR_URLS } from '~core/constants/urls.constants';

export const appRoutes: Route[] = [
  {
    path: ROOT_PATHS.home,
    component: HomeComponent,
  },
  {
    path: AUTHENTICATION_PATHS.base,
    loadChildren: async () =>
      import('./features/authentication/authentication.routes').then(
        (module_) => module_.AUTHENTICATION_ROUTES,
      ),
  },
  {
    path: USER_PATHS.base,
    loadChildren: async () =>
      import('./features/user/user.routes').then((module_) => module_.USER_ROUTES),
  },
  {
    path: POKEMON_PATHS.base,
    loadChildren: async () =>
      import('./features/pokemon/pokemon.routes').then((module_) => module_.POKEMON_ROUTES),
  },
  {
    path: ERROR_PATHS.base,
    loadChildren: async () =>
      import('./features/error/error.routes').then((module_) => module_.ERROR_ROUTES),
  },
  { path: '**', redirectTo: ERROR_URLS.notFound },
];
