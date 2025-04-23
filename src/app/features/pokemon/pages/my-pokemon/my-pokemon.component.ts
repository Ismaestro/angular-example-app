import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { UserService } from '~features/authentication/services/user.service';
import { PokemonCardComponent } from '~features/pokemon/components/pokemon-card/pokemon-card.component';
import { PokemonService } from '~features/pokemon/services/pokemon.service';
import { NgOptimizedImage } from '@angular/common';
import { translations } from '../../../../../locale/translations';
import { AlertStore } from '~core/services/ui/alert.store';
import { catchError, of, switchMap } from 'rxjs';
import { LetDirective, PushPipe } from '@ngrx/component';
import { PokemonSearchInputComponent } from '~features/pokemon/components/pokemon-search-input/pokemon-search-input.component';

@Component({
  selector: 'app-my-pokemon',
  templateUrl: './my-pokemon.component.html',
  styleUrl: './my-pokemon.component.scss',
  imports: [
    PokemonCardComponent,
    NgOptimizedImage,
    PushPipe,
    LetDirective,
    PokemonSearchInputComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MyPokemonComponent {
  private readonly userService = inject(UserService);
  private readonly pokemonService = inject(PokemonService);
  private readonly alertStore = inject(AlertStore);

  readonly translations = translations;
  readonly userPokemons$ = this.userService.getMe({ cache: false }).pipe(
    switchMap((user) => {
      if (user.caughtPokemonIds.length === 0) {
        return of([]);
      }
      return this.pokemonService.getPokemonByIds(user.caughtPokemonIds);
    }),
    catchError(() => {
      this.alertStore.createErrorAlert(translations.genericErrorAlert);
      return of([]);
    }),
  );
}
