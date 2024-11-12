import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  output,
} from '@angular/core';

import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { debounceTime, Subject } from 'rxjs';
import { Pokemon } from '~modules/pokemon/shared/pokemon.type';
import { PokemonService } from '~modules/pokemon/shared/pokemon.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PokemonSearchComponent implements OnInit {
  readonly loading = output<boolean>();
  readonly pokemonLoaded = output<Pokemon>();

  pokemonService = inject(PokemonService);
  searchSubject = new Subject<string>();
  termValue = '';

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(300)).subscribe(term => {
      this.loading.emit(true);

      this.pokemonService.getPokemon(term).subscribe({
        next: pokemon => {
          this.pokemonLoaded.emit(pokemon);
          this.loading.emit(false);
        },
        error: () => this.loading.emit(false),
      });
    });
  }

  termChange(event: Event) {
    const inputEvent = event as CustomEvent;
    this.termValue = (inputEvent.target as HTMLInputElement).value;
    this.searchSubject.next(this.termValue);
  }
}
