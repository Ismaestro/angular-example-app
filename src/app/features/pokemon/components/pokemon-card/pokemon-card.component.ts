import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import type { Pokemon } from '~features/pokemon/types/pokemon.type';
import { CardComponent } from '~core/components/card/card.component';
import { FirstTitleCasePipe } from '~core/pipes/first-title-case.pipe';

import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, FirstTitleCasePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PokemonCardComponent implements OnInit {
  readonly pokemon = input<Pokemon>();
  readonly loading = input<boolean>();

  pokemonImage: string | undefined;

  ngOnInit() {
    this.pokemonImage = this.pokemon()?.sprites.front_default;
  }
}
