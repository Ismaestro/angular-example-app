import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { PokemonService } from '~features/pokemon/services/pokemon.service';
import type { Pokemon } from '~features/pokemon/types/pokemon.type';
import type { ParamMap } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonBattlefieldComponent } from '~features/pokemon/components/pokemon-battlefield/pokemon-battlefield.component';
import { PokedexComponent } from '~features/pokemon/components/pokedex/pokedex.component';
import { BattleEvent } from '~features/pokemon/components/pokedex/enums/pokedex-action.enum';
import { translations } from '../../../../../locale/translations';
import { AlertService } from '~core/services/alert.service';
import { ROOT_URLS } from '~core/constants/urls.constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [PokemonBattlefieldComponent, PokedexComponent],
})
export class PokemonDetailComponent implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pokemonService = inject(PokemonService);
  private readonly alertService = inject(AlertService);

  // eslint-disable-next-line @angular-eslint/prefer-signals
  pokemonBattleEvent = signal(BattleEvent.POKEMON_LOADED);

  pokemon!: Pokemon;

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (parameterMap) => {
        this.handleRouteChange(parameterMap);
      },
    });
  }

  private handleRouteChange(parameterMap: ParamMap) {
    const pokemonId = parameterMap.get('pokemonId');
    if (pokemonId) {
      this.loadPokemonData(pokemonId);
    }
  }

  private loadPokemonData(pokemonId: string) {
    this.pokemonService
      .getPokemon(pokemonId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (pokemon) => {
          this.pokemon = pokemon;
          this.pokemonBattleEvent.set(BattleEvent.RESET_BATTLE);
          this.changeDetectorRef.markForCheck();
        },
        error: () => {
          this.alertService.createErrorAlert(translations.pokemonNotFoundError);
          void this.router.navigate([ROOT_URLS.error404]);
        },
      });
  }
}
