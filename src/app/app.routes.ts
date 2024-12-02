import {
  AUTHENTICATION_PATHS,
  DASHBOARD_PATHS,
  POKEMON_DETAIL_PATHS,
  ROOT_PATHS,
} from '~core/constants/paths.constants';
import { Error404Component } from '~core/components/error-404/error-404.component';
import type { Route } from '@angular/router';
import { HomeComponent } from '~features/home/home.component';

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
    path: DASHBOARD_PATHS.base,
    loadChildren: async () =>
      import('./features/dashboard/dashboard.routes').then((module_) => module_.DASHBOARD_ROUTES),
  },
  {
    path: POKEMON_DETAIL_PATHS.base,
    loadChildren: async () =>
      import('./features/pokemon-detail/pokemon-detail.routes').then(
        (module_) => module_.POKEMON_DETAIL_ROUTES,
      ),
  },
  { path: '404', component: Error404Component },
  { path: '**', redirectTo: '404' },
];
