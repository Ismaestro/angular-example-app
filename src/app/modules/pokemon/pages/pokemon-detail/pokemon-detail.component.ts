import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonCardComponent } from '~modules/pokemon/shared/components/pokemon-card/pokemon-card.component';
import { Observable } from 'rxjs';
import { Pokemon } from '~modules/pokemon/shared/pokemon.type';
import { PokemonService } from '~modules/pokemon/shared/pokemon.service';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';

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
  private _pokemonId!: string;

  pokemonService = inject(PokemonService);
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

  loadPokemon() {
    if (this._pokemonId) {
      this.pokemon$ = this.pokemonService.getPokemon(this._pokemonId);
    }
  }
}
