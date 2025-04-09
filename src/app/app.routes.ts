import { AUTHENTICATION_PATHS, POKEMON_PATHS, ROOT_PATHS } from '~core/constants/paths.constants';
import { Error404Component } from '~core/components/error-404/error-404.component';
import type { Route } from '@angular/router';
import { HomeComponent } from '~features/home/home.component';
import { MyPokemonComponent } from '~features/pokemon/pages/my-pokemon/my-pokemon.component';
import { authenticationGuard } from '~core/guards/authentication.guard';

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
    path: ROOT_PATHS.myPokemon,
    component: MyPokemonComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: POKEMON_PATHS.base,
    loadChildren: async () =>
      import('./features/pokemon/pokemon.routes').then((module_) => module_.POKEMON_ROUTES),
  },
  { path: '404', component: Error404Component },
  { path: '**', redirectTo: '404' },
];
