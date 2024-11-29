import type { Route } from '@angular/router';
import { ROOT_PATHS } from '~core/consts/paths.consts';
import { PokemonDetailComponent } from '~features/pokemon-detail/pages/pokemon-detail/pokemon-detail.component';

export const POKEMON_DETAIL_ROUTES: Route[] = [
  {
    path: ':pokemonId',
    component: PokemonDetailComponent,
  },
  { path: '**', redirectTo: ROOT_PATHS.error404 },
];
