import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { UserService } from '~features/authentication/services/user.service';
import { PokemonCardComponent } from '~features/pokemon/components/pokemon-card/pokemon-card.component';
import { PokemonService } from '~features/pokemon/services/pokemon.service';
import { NgOptimizedImage } from '@angular/common';
import { PokemonSearchComponent } from '~features/pokemon/components/pokemon-search/pokemon-search.component';
import { translations } from '../../../locale/translations';
import { AlertService } from '~core/services/alert.service';
import { catchError, of, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-my-pokemon',
  templateUrl: './my-pokemon.component.html',
  styleUrl: './my-pokemon.component.scss',
  imports: [PokemonCardComponent, NgOptimizedImage, PokemonSearchComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MyPokemonComponent {
  private readonly userService = inject(UserService);
  private readonly pokemonService = inject(PokemonService);
  private readonly alertService = inject(AlertService);

  readonly translations = translations;
  readonly userPokemons = toSignal(
    this.userService.getMe({ cache: false }).pipe(
      switchMap((user) => {
        if (user.caughtPokemonIds.length === 0) {
          return of([]);
        }
        return this.pokemonService.getPokemons(user.caughtPokemonIds);
      }),
      catchError(() => {
        this.alertService.createErrorAlert(translations.genericErrorAlert);
        return of([]);
      }),
    ),
    { initialValue: null },
  );
}
