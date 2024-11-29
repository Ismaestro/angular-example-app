import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  output,
} from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import type { Pokemon } from '~features/pokemon-detail/types/pokemon.type';
import { PokemonService } from '~features/pokemon-detail/services/pokemon.service';
import { SlInputIconFocusDirective } from '~core/directives/sl-input-icon-focus.directive';

import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

const SEARCH_DEBOUNCE_TIME = 300;

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrl: './pokemon-search.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [SlInputIconFocusDirective],
})
export class PokemonSearchComponent implements OnInit {
  termValue = '';
  isPokemonLoaded = false;

  readonly loading = output<boolean>();
  readonly pokemonLoaded = output<Pokemon>();

  private readonly pokemonService = inject(PokemonService);
  private readonly searchSubject = new Subject<string>();

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(SEARCH_DEBOUNCE_TIME)).subscribe((term) => {
      this.loading.emit(true);

      this.pokemonService.getPokemon(term).subscribe({
        next: (pokemon) => {
          this.pokemonLoaded.emit(pokemon);
          this.isPokemonLoaded = true;
          this.loading.emit(false);
        },
        error: () => {
          this.isPokemonLoaded = false;
          this.loading.emit(false);
        },
      });
    });
  }

  termChange(event: Event) {
    const inputEvent = event as CustomEvent;
    this.termValue = (inputEvent.target as HTMLInputElement).value;
    this.searchSubject.next(this.termValue);
  }
}
