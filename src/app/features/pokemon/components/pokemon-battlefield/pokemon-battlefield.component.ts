import type { OnInit, WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  Input,
  input,
} from '@angular/core';
import type { Pokemon } from '~features/pokemon/types/pokemon.type';
import { PokemonImageComponent } from '~features/pokemon/components/pokemon-image/pokemon-image.component';
import { PokemonCatchComponent } from '~features/pokemon/components/pokemon-catch/pokemon-catch.component';
import { NgOptimizedImage } from '@angular/common';
import { PokedexAction } from '~features/pokemon/components/pokedex/enums/pokedex-action.enum';

@Component({
  selector: 'app-pokemon-battlefield',
  templateUrl: './pokemon-battlefield.component.html',
  styleUrl: './pokemon-battlefield.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PokemonImageComponent, PokemonCatchComponent, NgOptimizedImage],
})
export class PokemonBattlefieldComponent implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  // TODO: review why signal-style here is not working
  @Input() pokedexAction!: WritableSignal<PokedexAction>;

  pokemon = input<Pokemon>();
  pokemonImage: string | undefined;
  startCatchAnimation = false;
  pokemonImageLoaded = false;

  constructor() {
    effect(() => {
      const pokemonValue = this.pokemon();
      if (pokemonValue) {
        this.pokemonImage = pokemonValue.sprites.front_default;
        this.changeDetectorRef.markForCheck();
      }
      if (this.pokedexAction() === PokedexAction.THROW_POKEBALL) {
        // Console.log('time to update the user with the pokemon and save the state for later');
        this.startCatchAnimation = true;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  ngOnInit(): void {
    this.pokemonImage = this.pokemon()?.sprites.front_default;
  }

  startPokemonInitialAnimation(loaded: boolean) {
    this.pokemonImageLoaded = loaded;
  }

  notifyPokedex() {
    this.pokedexAction.set(PokedexAction.CATCH_ANIMATION_ENDED);
  }
}
