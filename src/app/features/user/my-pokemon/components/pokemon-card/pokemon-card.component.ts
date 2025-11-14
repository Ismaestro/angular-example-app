import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
} from '@angular/core';
import type { Pokemon } from '~features/pokemon/types/pokemon.type';
import { CardComponent } from '~shared/components/card/card.component';
import { POKEMON_URLS } from '~core/constants/urls.constants';
import { FirstTitleCasePipe } from '~shared/pipes/first-title-case.pipe';
import { RouterLink } from '@angular/router';

import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';

@Component({
  selector: 'app-pokemon-card',
  imports: [CardComponent, FirstTitleCasePipe, RouterLink],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PokemonCardComponent implements OnInit {
  readonly pokemon = input<Pokemon>();
  readonly loading = input<boolean>();
  readonly POKEMON_URLS = POKEMON_URLS;
  readonly pokemonId = computed<string>(() => String(this.pokemon()?.id));

  pokemonImage: string | undefined;

  ngOnInit() {
    this.pokemonImage = this.pokemon()?.sprites.front_default;
  }
}
