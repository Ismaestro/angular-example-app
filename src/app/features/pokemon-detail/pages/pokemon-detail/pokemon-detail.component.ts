import type { OnDestroy, OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import { PokemonService } from '~features/pokemon-detail/services/pokemon.service';
import type { Pokemon } from '~features/pokemon-detail/types/pokemon.type';
import type { ParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionManagerService } from '~core/services/subscription-manager.service';
import { takeUntil } from 'rxjs';
import { PokemonBattlefieldComponent } from '~features/pokemon-detail/components/pokemon-battlefield/pokemon-battlefield.component';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [PokemonBattlefieldComponent],
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly subscriptionManager = inject(SubscriptionManagerService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pokemonService = inject(PokemonService);

  pokemon!: Pokemon;

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.subscriptionManager.getDestroySubject(this)))
      .subscribe({
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
      .pipe(takeUntil(this.subscriptionManager.getDestroySubject(this)))
      .subscribe({
        next: (pokemon) => {
          this.pokemon = pokemon;
          this.changeDetectorRef.markForCheck();
        },
        error: () => {
          // TODO: show alert
        },
      });
  }

  ngOnDestroy() {
    this.subscriptionManager.unsubscribe(this);
  }
}
