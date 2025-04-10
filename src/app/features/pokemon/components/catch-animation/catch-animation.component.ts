import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  signal,
  type WritableSignal,
} from '@angular/core';
import { NgOptimizedImage, NgStyle } from '@angular/common';
import { BattleEvent } from '~features/pokemon/components/pokedex/enums/pokedex-action.enum';
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

@Component({
  selector: 'app-catch-animation',
  templateUrl: './catch-animation.component.html',
  styleUrl: './catch-animation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [catchAnimations],
  imports: [NgOptimizedImage, NgStyle],
  host: {
    '(window:resize)': 'loadAnimationPositions()',
  },
})
export class CatchAnimationComponent implements OnInit {
  readonly pokemonBattleEvent = input.required<WritableSignal<BattleEvent>>();
  readonly pokeballStartingPoint = signal('');
  readonly pokeballPokemonXPoint = signal('');
  readonly pokeballPokemonYPoint = signal('');
  readonly pokeballGroundYPoint = signal('');
  readonly pokeballState = signal(PokeballState.Idle);
  readonly pokemonState = signal(PokemonState.Idle);

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
        this.pokeballState.set(PokeballState.Idle);
        this.pokemonState.set(PokemonState.Idle);
      }
    });
  }

  ngOnInit() {
    this.loadAnimationPositions();
  }

  startCatchAnimation() {
    this.pokeballState.set(PokeballState.Catching);

    setTimeout(() => {
      this.pokemonState.set(PokemonState.Shining);
    }, 500);
    setTimeout(() => {
      this.pokemonState.set(PokemonState.Disappear);
    }, 1500);
    setTimeout(() => {
      this.pokeballState.set(PokeballState.Falling);
    }, 1700);
    setTimeout(() => {
      this.pokeballState.set(PokeballState.Shaking);
    }, 3000);
    setTimeout(() => {
      this.pokeballState.set(PokeballState.Shining);
      this.pokemonBattleEvent().set(BattleEvent.CATCH_ANIMATION_ENDED);
    }, 6500);
  }

  loadAnimationPositions() {
    if (window.innerWidth <= 768) {
      this.setMobilePositions();
    } else {
      this.setDesktopPositions();
    }
  }

  private setMobilePositions() {
    this.pokeballStartingPoint.set('0px, -80px');
    this.pokeballPokemonXPoint.set('105px');
    this.pokeballPokemonYPoint.set('-140px');
    this.pokeballGroundYPoint.set('-80px');
  }

  private setDesktopPositions() {
    this.pokeballStartingPoint.set('80px, 15px');
    this.pokeballPokemonXPoint.set('260px');
    this.pokeballPokemonYPoint.set('-100px');
    this.pokeballGroundYPoint.set('-10px');
  }
}
