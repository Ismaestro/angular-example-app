import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import { of } from 'rxjs';
import { UserStore } from '~features/authentication/services/user.store';
import { PokemonService } from '~features/pokemon/services/pokemon.service';
import { PokemonCardComponent } from '~features/user/my-pokemon/components/pokemon-card/pokemon-card.component';
import { translations } from '~locale/translations';
import { PokemonSearchInputComponent } from '~shared/components/pokemon-search-input/pokemon-search-input.component';

@Component({
  selector: 'app-my-pokemon',
  imports: [PokemonCardComponent, NgOptimizedImage, PokemonSearchInputComponent],
  templateUrl: './my-pokemon.component.html',
  styleUrl: './my-pokemon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyPokemonComponent {
  private readonly userStore = inject(UserStore);
  private readonly pokemonService = inject(PokemonService);

  readonly translations = translations;

  /** Reloaded automatically whenever the caught pokemon of the user change */
  readonly userPokemons = rxResource({
    params: () =>
      this.userStore.user.hasValue() ? this.userStore.user.value().caughtPokemonIds : undefined,
    stream: ({ params: pokemonIds }) =>
      pokemonIds.length > 0 ? this.pokemonService.getPokemonByIds(pokemonIds) : of([]),
    defaultValue: [],
  });

  readonly isLoading = computed(
    () => this.userStore.user.isLoading() || this.userPokemons.isLoading(),
  );
  readonly hasError = computed(() => !!this.userStore.user.error() || !!this.userPokemons.error());
  // `value()` throws while the resource is in an error state, `hasValue()` guards against it
  readonly pokemons = computed(() =>
    this.userPokemons.hasValue() ? this.userPokemons.value() : [],
  );
  readonly searchTitle = computed(() =>
    this.pokemons().length > 0 ? translations.findMore : translations.findPokemon,
  );
}
