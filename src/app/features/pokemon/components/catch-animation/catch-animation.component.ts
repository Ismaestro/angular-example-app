import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { catchAnimations } from '~features/pokemon/components/catch-animation/catch.animations';

enum PokeballState {
  Idle = 'idle',
  Catching = 'catching',
  Falling = 'falling',
  Shaking = 'shaking',
  Shining = 'shining',
}

enum PokemonState {
  Idle = 'idle',
  Shining = 'shining',
  Disappear = 'disappear',
}

type CatchStep = {
  delayMs: number;
  pokeball?: PokeballState;
  pokemon?: PokemonState;
  isLast?: boolean;
};

const CATCH_SEQUENCE: readonly CatchStep[] = [
  { delayMs: 500, pokemon: PokemonState.Shining },
  { delayMs: 1500, pokemon: PokemonState.Disappear },
  { delayMs: 1700, pokeball: PokeballState.Falling },
  { delayMs: 3000, pokeball: PokeballState.Shaking },
  { delayMs: 6500, pokeball: PokeballState.Shining, isLast: true },
];

@Component({
  selector: 'app-catch-animation',
  imports: [NgOptimizedImage],
  templateUrl: './catch-animation.component.html',
  styleUrl: './catch-animation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [catchAnimations],
})
export class CatchAnimationComponent {
  readonly pokeballThrown = input(false);
  readonly catchAnimationEnd = output();

  /** Both states start over every time the pokeball is thrown or the battle is reset */
  readonly pokeballState = linkedSignal<PokeballState>(() =>
    this.pokeballThrown() ? PokeballState.Catching : PokeballState.Idle,
  );
  readonly pokemonState = linkedSignal<boolean, PokemonState>({
    source: this.pokeballThrown,
    computation: () => PokemonState.Idle,
  });

  constructor() {
    // An effect is the right tool here: it schedules side effects (timers), it does not derive state
    effect((onCleanup) => {
      if (!this.pokeballThrown()) {
        return;
      }

      const timeouts = CATCH_SEQUENCE.map((step) =>
        setTimeout(() => {
          this.runStep(step);
        }, step.delayMs),
      );

      // Runs when the pokeball is reset or the component is destroyed: no timer outlives it
      onCleanup(() => {
        for (const timeout of timeouts) {
          clearTimeout(timeout);
        }
      });
    });
  }

  private runStep({ pokeball, pokemon, isLast }: CatchStep): void {
    if (pokeball) {
      this.pokeballState.set(pokeball);
    }
    if (pokemon) {
      this.pokemonState.set(pokemon);
    }
    if (isLast) {
      this.catchAnimationEnd.emit();
    }
  }
}
