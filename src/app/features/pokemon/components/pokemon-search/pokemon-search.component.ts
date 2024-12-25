import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  input,
} from '@angular/core';
import { PokemonService } from '~features/pokemon/services/pokemon.service';
import { SlInputIconFocusDirective } from '~core/directives/sl-input-icon-focus.directive';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { POKEMON_URLS } from '~core/constants/urls.constants';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { translations } from '../../../../../locale/translations';
import { AlertService } from '~core/services/alert.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrl: './pokemon-search.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [SlInputIconFocusDirective, NgOptimizedImage],
})
export class PokemonSearchComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly router = inject(Router);
  private readonly pokemonService = inject(PokemonService);
  private readonly alertService = inject(AlertService);
  private readonly destroyRef = inject(DestroyRef);

  readonly title = input<string>(translations.findPokemon);

  termValue = '';
  pokemonLoading = false;

  searchPokemon() {
    const pokemonName = this.termValue.trim().toLowerCase();
    if (pokemonName) {
      this.pokemonLoading = true;

      this.pokemonService
        .getPokemon(pokemonName)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (pokemon) => {
            this.pokemonLoading = false;
            this.termValue = '';
            void this.router.navigate([POKEMON_URLS.detail(pokemon.name)]);
            this.changeDetectorRef.markForCheck();
          },
          error: () => {
            this.pokemonLoading = false;
            this.alertService.createErrorAlert(translations.pokemonNotFoundError);
            this.changeDetectorRef.markForCheck();
          },
        });
    }
  }

  assignInputValue(event: Event) {
    const inputEvent = event as CustomEvent;
    this.termValue = (inputEvent.target as HTMLInputElement).value;
  }
}
