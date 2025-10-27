import type { Route } from '@angular/router';
import { PokemonDetailComponent } from '~features/pokemon/pages/pokemon-detail/pokemon-detail.component';

export const POKEMON_ROUTES: Route[] = [
  {
    path: ':pokemonId',
    component: PokemonDetailComponent,
  },
];
