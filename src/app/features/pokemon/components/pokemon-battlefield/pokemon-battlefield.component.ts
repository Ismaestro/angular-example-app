import type { OnInit, WritableSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
import type { Pokemon } from '~features/pokemon/types/pokemon.type';
import { PokemonImageComponent } from '~features/pokemon/components/pokemon-image/pokemon-image.component';
import { NgOptimizedImage } from '@angular/common';
import { BattleEvent } from '~features/pokemon/components/pokedex/enums/pokedex-action.enum';
import { CatchAnimationComponent } from '~features/pokemon/components/catch-animation/catch-animation.component';

@Component({
  selector: 'app-pokemon-battlefield',
  templateUrl: './pokemon-battlefield.component.html',
  styleUrl: './pokemon-battlefield.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PokemonImageComponent, CatchAnimationComponent, NgOptimizedImage],
})
export class PokemonBattlefieldComponent implements OnInit {
  readonly pokemonBattleEvent = input.required<WritableSignal<BattleEvent>>();
  readonly pokemon = input<Pokemon | null>();
  readonly pokemonImage = signal('');
  readonly startCatchAnimation = signal(false);
  readonly pokemonImageLoaded = signal(false);

  constructor() {
    effect(() => {
      this.updatePokemonImage();
      this.handleThrowPokeballEvent();
      this.handleResetBattleEvent();
    });
  }

  ngOnInit(): void {
    this.pokemonImage.set(this.pokemon()?.sprites.front_default ?? '');
  }

  startPokemonInitialAnimation(loaded: boolean) {
    this.pokemonImageLoaded.set(loaded);
  }

  private updatePokemonImage(): void {
    const pokemonValue = this.pokemon();
    if (pokemonValue) {
      this.pokemonImage.set(pokemonValue.sprites.front_default);
    }
  }

  private handleThrowPokeballEvent(): void {
    if ((this.pokemonBattleEvent()() as unknown as BattleEvent) === BattleEvent.THROW_POKEBALL) {
      this.startCatchAnimation.set(true);
    }
  }

  private handleResetBattleEvent(): void {
    if ((this.pokemonBattleEvent()() as unknown as BattleEvent) === BattleEvent.RESET_BATTLE) {
      this.startCatchAnimation.set(false);
      this.pokemonImageLoaded.set(false);
    }
  }
}
