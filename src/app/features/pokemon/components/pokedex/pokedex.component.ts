import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import type { Pokemon } from '~features/pokemon/types/pokemon.types';
import type { BattlePhase } from '~features/pokemon/types/battle-phase.types';
import { PokemonImageComponent } from '~features/pokemon/components/pokemon-image/pokemon-image.component';
import { FirstTitleCasePipe } from '~shared/pipes/first-title-case.pipe';
import { UserStore } from '~features/authentication/services/user.store';

import '@shoelace-style/shoelace/dist/components/button/button.js';

type PokedexStatus = 'loading' | 'missing' | 'catching' | 'caught' | 'owned';

const OPENING_DELAY_MS = 300;

@Component({
  selector: 'app-pokedex',
  imports: [PokemonImageComponent, FirstTitleCasePipe],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss', './pokedex-pads.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PokedexComponent {
  private readonly userStore = inject(UserStore);
  private readonly destroyRef = inject(DestroyRef);

  readonly pokemon = input.required<Pokemon>();
  readonly battlePhase = input.required<BattlePhase>();
  readonly pokeballThrow = output();

  readonly isPokedexClosed = signal(true);
  readonly user = this.userStore.user.value;
  readonly pokemonImage = computed(() => this.pokemon().sprites.front_default);
  readonly status = computed<PokedexStatus>(() => {
    const battlePhase = this.battlePhase();
    if (battlePhase === 'caught') {
      return 'caught';
    }
    if (battlePhase !== 'ready') {
      return 'catching';
    }
    if (this.userStore.user.isLoading()) {
      return 'loading';
    }
    return this.user()?.caughtPokemonIds.includes(this.pokemon().id) ? 'owned' : 'missing';
  });

  constructor() {
    // Opened once rendered in the browser, so the opening transition can be seen
    afterNextRender(() => {
      const timeout = setTimeout(() => {
        this.isPokedexClosed.set(false);
      }, OPENING_DELAY_MS);
      this.destroyRef.onDestroy(() => {
        clearTimeout(timeout);
      });
    });
  }

  togglePokedex() {
    this.isPokedexClosed.update((isClosed) => !isClosed);
  }
}
