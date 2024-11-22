import {
  AUTHENTICATION_PATHS,
  POKEMON_DETAIL_PATHS,
  ROOT_PATHS,
  DASHBOARD_PATHS,
} from '~core/consts/paths.consts';
import { Error404Component } from '~core/components/error-404/error-404.component';
import { Route } from '@angular/router';
import { HomeComponent } from '~features/home/home.component';

export const appRoutes: Route[] = [
  {
    path: ROOT_PATHS.home,
    component: HomeComponent,
  },
  {
    path: AUTHENTICATION_PATHS.base,
    loadChildren: () =>
      import('./features/authentication/authentication.routes').then(
        (mod) => mod.AUTHENTICATION_ROUTES,
      ),
  },
  {
    path: DASHBOARD_PATHS.base,
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((mod) => mod.DASHBOARD_ROUTES),
  },
  {
    path: POKEMON_DETAIL_PATHS.base,
    loadChildren: () =>
      import('./features/pokemon-detail/pokemon-detail.routes').then(
        (mod) => mod.POKEMON_DETAIL_ROUTES,
      ),
  },
  { path: '404', component: Error404Component },
  { path: '**', redirectTo: '404' },
];
