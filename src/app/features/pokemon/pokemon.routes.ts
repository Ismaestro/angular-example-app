import type { Route } from '@angular/router';
import { ROOT_PATHS } from '~core/constants/paths.constants';
import { PokemonDetailComponent } from '~features/pokemon/pages/pokemon-detail/pokemon-detail.component';
import { authenticationGuard } from '~core/guards/authentication.guard';

export const POKEMON_ROUTES: Route[] = [
  {
    path: ':pokemonId',
    component: PokemonDetailComponent,
    canActivate: [authenticationGuard],
  },
  { path: '**', redirectTo: ROOT_PATHS.error404 },
];
