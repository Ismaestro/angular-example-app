import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
} from '@angular/core';
import type { Observable } from 'rxjs';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { PokemonService } from '~features/pokemon-detail/services/pokemon.service';
import type { Pokemon } from '~features/pokemon-detail/types/pokemon.type';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, NgOptimizedImage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PokemonDetailComponent implements OnInit {
  pokemon$!: Observable<Pokemon>;

  private readonly pokemonService = inject(PokemonService);

  private _pokemonId!: string;

  get pokemonId(): string {
    return this._pokemonId;
  }

  @Input()
  set pokemonId(value: string) {
    this._pokemonId = value;
    this.loadPokemon();
  }

  ngOnInit() {
    this.loadPokemon();
  }

  private loadPokemon() {
    if (this._pokemonId) {
      this.pokemon$ = this.pokemonService.getPokemon(this._pokemonId);
    }
  }
}
