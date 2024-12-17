import type { OnInit } from '@angular/core';
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

@Component({
  selector: 'app-pokemon-battlefield',
  templateUrl: './pokemon-battlefield.component.html',
  styleUrl: './pokemon-battlefield.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PokemonImageComponent],
})
export class PokemonBattlefieldComponent implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  pokemon = input<Pokemon>();
  pokemonImage: string | undefined;
  pokemonImageLoaded = false;

  constructor() {
    effect(() => {
      this.pokemonImage = '';
      this.pokemonImageLoaded = false;
      this.changeDetectorRef.markForCheck();
      const pokemonValue = this.pokemon();
      // In order to wait for the animation
      setTimeout(() => {
        this.pokemonImage = pokemonValue?.sprites.front_default;
        this.changeDetectorRef.markForCheck();
      }, 200);
    });
  }

  ngOnInit(): void {
    this.pokemonImage = this.pokemon()?.sprites.front_default;
  }

  startAnimation(loaded: boolean) {
    this.pokemonImageLoaded = loaded;
  }
}
