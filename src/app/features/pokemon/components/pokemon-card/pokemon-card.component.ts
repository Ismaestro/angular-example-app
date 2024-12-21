import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Pokemon } from '~features/pokemon/types/pokemon.type';
import { CardComponent } from '~core/components/card/card.component';
import { FirstTitleCasePipe } from '~core/pipes/first-title-case.pipe';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, FirstTitleCasePipe, NgOptimizedImage],
})
export class PokemonCardComponent implements OnInit {
  pokemon = input<Pokemon>();
  pokemonImage: string | undefined;

  ngOnInit() {
    this.pokemonImage = this.pokemon()?.sprites.front_default;
  }
}
