import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '~features/authentication/services/user.service';
import { PokemonService } from '~features/pokemon/services/pokemon.service';
import { NgOptimizedImage } from '@angular/common';
import { AlertService } from '~core/services/ui/alert.service';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { PokemonCardComponent } from '~features/user/my-pokemon/components/pokemon-card/pokemon-card.component';
import { translations } from '~locale/translations';
import { PokemonSearchInputComponent } from '~shared/components/pokemon-search-input/pokemon-search-input.component';

@Component({
  selector: 'app-my-pokemon',
  imports: [PokemonCardComponent, NgOptimizedImage, PokemonSearchInputComponent],
  templateUrl: './my-pokemon.component.html',
  styleUrl: './my-pokemon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MyPokemonComponent {
  private readonly userService = inject(UserService);
  private readonly pokemonService = inject(PokemonService);
  private readonly alertService = inject(AlertService);

  readonly translations = translations;
  readonly loading = signal(true);

  readonly userPokemons = toSignal(
    this.userService.getMe({ cache: false }).pipe(
      switchMap((user) => {
        if (user.caughtPokemonIds.length === 0) {
          return of([]);
        }
        return this.pokemonService.getPokemonByIds(user.caughtPokemonIds);
      }),
      catchError(() => {
        this.alertService.createErrorAlert(translations.genericErrorAlert);
        return of([]);
      }),
      startWith([]),
      map((result) => {
        this.loading.set(false);
        return result;
      }),
    ),
    { initialValue: [] },
  );
}
