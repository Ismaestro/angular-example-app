import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { PokemonCardComponent } from '~features/pokemon-detail/components/pokemon-card/pokemon-card.component';
import { PokemonService } from '~features/pokemon-detail/services/pokemon.service';
import { Pokemon } from '~features/pokemon-detail/types/pokemon.type';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, PokemonCardComponent, AsyncPipe, NgOptimizedImage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PokemonDetailComponent implements OnInit {
  private readonly pokemonService = inject(PokemonService);

  private _pokemonId!: string;

  pokemon$!: Observable<Pokemon>;

  @Input()
  set pokemonId(value: string) {
    this._pokemonId = value;
    this.loadPokemon();
  }

  get pokemonId(): string {
    return this._pokemonId;
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
