import type { OnInit, WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import type { Pokemon } from '~features/pokemon/types/pokemon.type';
import { PokemonImageComponent } from '~features/pokemon/components/pokemon-image/pokemon-image.component';
import { PokemonCatchComponent } from '~features/pokemon/components/pokemon-catch/pokemon-catch.component';
import { NgOptimizedImage } from '@angular/common';
import { BattleEvent } from '~features/pokemon/components/pokedex/enums/pokedex-action.enum';

@Component({
  selector: 'app-pokemon-battlefield',
  templateUrl: './pokemon-battlefield.component.html',
  styleUrl: './pokemon-battlefield.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PokemonImageComponent, PokemonCatchComponent, NgOptimizedImage],
})
export class PokemonBattlefieldComponent implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  readonly pokemonBattleEvent = input.required<WritableSignal<BattleEvent>>();
  readonly pokemon = input<Pokemon>();

  pokemonImage: string | undefined;
  startCatchAnimation = false;
  pokemonImageLoaded = false;

  constructor() {
    effect(() => {
      this.updatePokemonImage();
      this.handleThrowPokeballEvent();
      this.handleResetBattleEvent();
    });
  }

  ngOnInit(): void {
    this.pokemonImage = this.pokemon()?.sprites.front_default;
  }

  startPokemonInitialAnimation(loaded: boolean) {
    this.pokemonImageLoaded = loaded;
  }

  private updatePokemonImage(): void {
    const pokemonValue = this.pokemon();
    if (pokemonValue) {
      this.pokemonImage = pokemonValue.sprites.front_default;
      this.changeDetectorRef.markForCheck();
    }
  }

  private handleThrowPokeballEvent(): void {
    if ((this.pokemonBattleEvent()() as unknown as BattleEvent) === BattleEvent.THROW_POKEBALL) {
      this.startCatchAnimation = true;
      this.changeDetectorRef.markForCheck();
    }
  }

  private handleResetBattleEvent(): void {
    if ((this.pokemonBattleEvent()() as unknown as BattleEvent) === BattleEvent.RESET_BATTLE) {
      this.startCatchAnimation = false;
      this.pokemonImageLoaded = false;
      this.changeDetectorRef.markForCheck();
    }
  }
}
