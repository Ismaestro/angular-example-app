import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  input,
  type WritableSignal,
} from '@angular/core';
import { NgOptimizedImage, NgStyle } from '@angular/common';
import { catchAnimations } from '~features/pokemon/components/pokemon-catch/pokemon-catch.animations';
import { BattleEvent } from '~features/pokemon/components/pokedex/enums/pokedex-action.enum';

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

@Component({
  selector: 'app-pokemon-catch',
  templateUrl: './pokemon-catch.component.html',
  styleUrl: './pokemon-catch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [catchAnimations],
  imports: [NgOptimizedImage, NgStyle],
  host: {
    '(window:resize)': 'loadAnimationPositions()',
  },
})
export class PokemonCatchComponent implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  readonly pokemonBattleEvent = input.required<WritableSignal<BattleEvent>>();

  pokeballState: PokeballState = PokeballState.Idle;
  pokemonState: PokemonState = PokemonState.Idle;

  pokeballStartingPoint!: string;
  pokeballPokemonXPoint!: string;
  pokeballPokemonYPoint!: string;
  pokeballGroundYPoint!: string;

  constructor() {
    effect(() => {
      const pokemonBattleEvent = this.pokemonBattleEvent();
      if (pokemonBattleEvent() === BattleEvent.THROW_POKEBALL) {
        this.startCatchAnimation();
      }
      if (
        pokemonBattleEvent() === BattleEvent.POKEMON_LOADED ||
        pokemonBattleEvent() === BattleEvent.RESET_BATTLE
      ) {
        this.pokeballState = PokeballState.Idle;
        this.pokemonState = PokemonState.Idle;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  ngOnInit() {
    this.loadAnimationPositions();
  }

  startCatchAnimation() {
    this.pokeballState = PokeballState.Catching;
    this.changeDetectorRef.markForCheck();

    setTimeout(() => {
      this.pokemonState = PokemonState.Shining;
      this.changeDetectorRef.markForCheck();
    }, 500);
    setTimeout(() => {
      this.pokemonState = PokemonState.Disappear;
      this.changeDetectorRef.markForCheck();
    }, 1500);
    setTimeout(() => {
      this.pokeballState = PokeballState.Falling;
      this.changeDetectorRef.markForCheck();
    }, 1700);
    setTimeout(() => {
      this.pokeballState = PokeballState.Shaking;
      this.changeDetectorRef.markForCheck();
    }, 3000);
    setTimeout(() => {
      this.pokeballState = PokeballState.Shining;
      this.pokemonBattleEvent().set(BattleEvent.CATCH_ANIMATION_ENDED);
      this.changeDetectorRef.markForCheck();
    }, 6500);
  }

  loadAnimationPositions() {
    if (window.innerWidth <= 768) {
      this.setMobilePositions();
    } else {
      this.setDesktopPositions();
    }
    this.changeDetectorRef.markForCheck();
  }

  private setMobilePositions() {
    this.pokeballStartingPoint = '0px, -80px';
    this.pokeballPokemonXPoint = '105px';
    this.pokeballPokemonYPoint = '-140px';
    this.pokeballGroundYPoint = '-80px';
  }

  private setDesktopPositions() {
    this.pokeballStartingPoint = '80px, 15px';
    this.pokeballPokemonXPoint = '260px';
    this.pokeballPokemonYPoint = '-100px';
    this.pokeballGroundYPoint = '-10px';
  }
}
