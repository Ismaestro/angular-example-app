import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import type { Pokemon } from '~features/pokemon-detail/types/pokemon.type';
import { PokemonService } from '~features/pokemon-detail/services/pokemon.service';
import { SlInputIconFocusDirective } from '~core/directives/sl-input-icon-focus.directive';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { POKEMON_URLS } from '~core/constants/urls.constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrl: './pokemon-search.component.scss',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [SlInputIconFocusDirective, NgOptimizedImage, RouterLink],
})
export class PokemonSearchComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly pokemonService = inject(PokemonService);

  termValue = '';
  pokemonLoaded: Pokemon | undefined;
  pokemonNotFound = false;
  pokemonLoading = false;
  pokemonLoadedRoute = '';

  searchPokemon() {
    if (this.termValue) {
      this.pokemonLoading = true;

      this.pokemonService.getPokemon(this.termValue).subscribe({
        next: (pokemon) => {
          this.pokemonLoading = false;
          this.pokemonNotFound = false;
          this.pokemonLoaded = pokemon;
          this.pokemonLoadedRoute = POKEMON_URLS.detail(this.pokemonLoaded.name);
          this.changeDetectorRef.markForCheck();
        },
        error: () => {
          this.pokemonLoading = false;
          this.pokemonNotFound = true;
          this.changeDetectorRef.markForCheck();
        },
      });
    }
  }

  assignInputValue(event: Event) {
    const inputEvent = event as CustomEvent;
    this.termValue = (inputEvent.target as HTMLInputElement).value;
    if (!this.termValue) {
      this.pokemonLoaded = undefined;
      this.pokemonLoading = false;
      this.pokemonNotFound = false;
    } else if (this.pokemonLoaded) {
      this.pokemonLoaded = undefined;
    }
  }
}
