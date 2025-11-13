import type { Route } from '@angular/router';
import { USER_PATHS } from '~core/constants/paths.constants';
import { MyPokemonComponent } from '~features/user/my-pokemon/pages/my-pokemon/my-pokemon.component';

export const USER_ROUTES: Route[] = [
  { path: '', redirectTo: USER_PATHS.myPokemon, pathMatch: 'full' },
  {
    path: USER_PATHS.myPokemon,
    component: MyPokemonComponent,
  },
];
