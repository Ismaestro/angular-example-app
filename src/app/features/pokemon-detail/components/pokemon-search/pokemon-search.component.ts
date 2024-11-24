import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  output,
} from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { Pokemon } from '~features/pokemon-detail/types/pokemon.type';
import { PokemonService } from '~features/pokemon-detail/services/pokemon.service';
import { SlInputIconFocusDirective } from '~core/directives/sl-input-icon-focus.directive';

import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [SlInputIconFocusDirective],
})
export class PokemonSearchComponent implements OnInit {
  private readonly pokemonService = inject(PokemonService);
  private readonly searchSubject = new Subject<string>();

  readonly loading = output<boolean>();
  readonly pokemonLoaded = output<Pokemon>();

  termValue = '';
  isPokemonLoaded = false;

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(300)).subscribe((term) => {
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
