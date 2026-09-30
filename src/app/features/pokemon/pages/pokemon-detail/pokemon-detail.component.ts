import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PokemonService } from '~features/pokemon/services/pokemon.service';
import type { Pokemon } from '~features/pokemon/types/pokemon.types';
import type { BattlePhase } from '~features/pokemon/types/battle-phase.types';
import { PokemonBattlefieldComponent } from '~features/pokemon/components/pokemon-battlefield/pokemon-battlefield.component';
import { PokedexComponent } from '~features/pokemon/components/pokedex/pokedex.component';
import { UserStore } from '~features/authentication/services/user.store';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { translations } from '~locale/translations';
import { AlertService } from '~core/services/ui/alert.service';
import { PokemonSearchInputComponent } from '~shared/components/pokemon-search-input/pokemon-search-input.component';

/**
 * Container of the battle: it owns the battle state and passes it down to its presentational
 * children through inputs, which report back what happened through outputs.
 */
@Component({
  selector: 'app-pokemon-detail',
  imports: [PokemonBattlefieldComponent, PokedexComponent, PokemonSearchInputComponent],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailComponent {
  private readonly pokemonService = inject(PokemonService);
  private readonly userStore = inject(UserStore);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly alertService = inject(AlertService);
  private readonly destroyRef = inject(DestroyRef);

  readonly translations = translations;
  readonly pokemonId = input.required<string>();
  readonly pokemonResource = this.pokemonService.getPokemonResource(this.pokemonId);
  // `value()` throws while the resource is in an error state, `hasValue()` guards against it
  readonly loadedPokemon = computed(() =>
    this.pokemonResource.hasValue() ? this.pokemonResource.value() : undefined,
  );

  /** The battle starts over every time a different pokemon is loaded */
  readonly battlePhase = linkedSignal<Pokemon | undefined, BattlePhase>({
    source: this.loadedPokemon,
    computation: () => 'ready',
  });
  readonly pokeballThrown = computed(
    () => this.battlePhase() === 'throwing' || this.battlePhase() === 'caught',
  );

  catchPokemon(pokemon: Pokemon): void {
    this.battlePhase.set('catching');
    this.userStore
      .catchPokemon(pokemon.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.battlePhase.set('throwing');
        },
        error: () => {
          this.battlePhase.set('ready');
          // When the session has expired, the authentication interceptor already notifies the user
          if (this.authenticationService.authState().isLoggedIn) {
            this.alertService.createErrorAlert(translations.genericErrorAlert);
          }
        },
      });
  }

  onCatchAnimationEnd(): void {
    this.battlePhase.set('caught');
  }
}
