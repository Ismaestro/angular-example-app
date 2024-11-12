import { Route } from '@angular/router';
import { ROOT_PATHS } from '~modules/shared/consts/paths.consts';
import { PokemonDetailComponent } from '~modules/pokemon/pages/pokemon-detail/pokemon-detail.component';

export const POKEMON_ROUTES: Route[] = [
  {
    path: ':pokemonId',
    component: PokemonDetailComponent,
  },
  { path: '**', redirectTo: ROOT_PATHS.error404 },
];
