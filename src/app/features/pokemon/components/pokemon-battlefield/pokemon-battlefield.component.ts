import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import type { Pokemon } from '~features/pokemon/types/pokemon.types';
import { PokemonImageComponent } from '~features/pokemon/components/pokemon-image/pokemon-image.component';
import { NgOptimizedImage } from '@angular/common';
import { CatchAnimationComponent } from '~features/pokemon/components/catch-animation/catch-animation.component';

@Component({
  selector: 'app-pokemon-battlefield',
  imports: [PokemonImageComponent, CatchAnimationComponent, NgOptimizedImage],
  templateUrl: './pokemon-battlefield.component.html',
  styleUrl: './pokemon-battlefield.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonBattlefieldComponent {
  readonly pokemon = input.required<Pokemon>();
  readonly pokeballThrown = input(false);
  readonly catchAnimationEnd = output();

  readonly pokemonImage = computed(() => this.pokemon().sprites.front_default);
  /** Hidden again every time the pokemon changes, until its image has been loaded */
  readonly pokemonImageLoaded = linkedSignal({
    source: this.pokemon,
    computation: () => false,
  });

  onPokemonImageLoaded(): void {
    this.pokemonImageLoaded.set(true);
  }
}
