import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  signal,
} from '@angular/core';
import { PokemonService } from '~features/pokemon/services/pokemon.service';
import type { Pokemon } from '~features/pokemon/types/pokemon.type';
import { ActivatedRoute } from '@angular/router';
import { PokemonBattlefieldComponent } from '~features/pokemon/components/pokemon-battlefield/pokemon-battlefield.component';
import { PokedexComponent } from '~features/pokemon/components/pokedex/pokedex.component';
import { BattleEvent } from '~features/pokemon/components/pokedex/enums/pokedex-action.enum';
import { translations } from '~locale/translations';
import { AlertService } from '~core/services/ui/alert.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  imports: [PokemonBattlefieldComponent, PokedexComponent],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PokemonDetailComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pokemonService = inject(PokemonService);
  private readonly alertService = inject(AlertService);

  readonly pokemonId = toSignal(
    this.activatedRoute.paramMap.pipe(map((parameters) => parameters.get('pokemonId') ?? '')),
    { initialValue: '' },
  );
  readonly pokemonResource = this.pokemonService.getPokemonResource(this.pokemonId);
  readonly pokemon = signal<Pokemon | null>(null);

  // eslint-disable-next-line @angular-eslint/prefer-signals
  pokemonBattleEvent = signal(BattleEvent.POKEMON_LOADED);

  constructor() {
    effect(() => {
      if (this.pokemonResource.value()) {
        this.pokemonBattleEvent.set(BattleEvent.RESET_BATTLE);
      }
      if (this.pokemonResource.error()) {
        this.alertService.createErrorAlert(translations.pokemonNotFoundError);
      }
    });
  }
}
