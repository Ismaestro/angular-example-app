import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
} from '@angular/core';
import type { Pokemon } from '~features/pokemon/types/pokemon.types';
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
export class PokemonCardComponent {
  readonly pokemon = input<Pokemon>();
  readonly loading = input<boolean>();

  readonly detailUrl = computed(() => POKEMON_URLS.detail(String(this.pokemon()?.id)));
  readonly pokemonImage = computed(() => this.pokemon()?.sprites.front_default ?? '');
}
