import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  input,
} from '@angular/core';
import type { Pokemon } from '~features/pokemon/types/pokemon.type';
import { PokemonImageComponent } from '~features/pokemon/components/pokemon-image/pokemon-image.component';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [PokemonImageComponent],
})
export class PokedexComponent implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  pokemon = input<Pokemon>();
  isPokedexClosed = true;
  pokemonImage: string | undefined;

  constructor() {
    effect(() => {
      this.pokemonImage = this.pokemon()?.sprites.front_default;
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnInit() {
    this.pokemonImage = this.pokemon()?.sprites.front_default;
    setTimeout(() => {
      this.isPokedexClosed = false;
      this.changeDetectorRef.markForCheck();
    }, 300);
  }

  togglePokedex() {
    this.isPokedexClosed = !this.isPokedexClosed;
  }
}
