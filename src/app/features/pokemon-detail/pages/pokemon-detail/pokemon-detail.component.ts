import type { AfterViewInit, ElementRef, OnDestroy, Signal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  viewChild,
} from '@angular/core';
import { PokemonService } from '~features/pokemon-detail/services/pokemon.service';
import type { Pokemon } from '~features/pokemon-detail/types/pokemon.type';
import type { ParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionManagerService } from '~core/services/subscription-manager.service';
import { takeUntil } from 'rxjs';
import { CropImageService } from '~core/services/crop-image.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PokemonDetailComponent implements AfterViewInit, OnDestroy {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly cropImageService = inject(CropImageService);
  private readonly subscriptionManager = inject(SubscriptionManagerService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pokemonService = inject(PokemonService);

  canvas: Signal<ElementRef<HTMLCanvasElement> | undefined> = viewChild('canvas');
  croppedImageUrl!: string;
  pokemon!: Pokemon;
  croppedImageLoaded = false;

  ngAfterViewInit() {
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
      this.resetState();
      this.loadPokemonData(pokemonId);
    }
  }

  private resetState() {
    this.croppedImageUrl = '';
    this.croppedImageLoaded = false;
    this.changeDetectorRef.markForCheck();
  }

  private loadPokemonData(pokemonId: string) {
    this.pokemonService
      .getPokemon(pokemonId)
      .pipe(takeUntil(this.subscriptionManager.getDestroySubject(this)))
      .subscribe({
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        next: async (pokemon) => this.handlePokemonLoaded(pokemon),
        error: () => {
          // TODO: show alert
        },
      });
  }

  private async handlePokemonLoaded(pokemon: Pokemon) {
    this.pokemon = pokemon;
    const canvasElement = this.canvas();
    if (canvasElement) {
      this.croppedImageUrl = await this.cropImageService.getCroppedImageURL(
        canvasElement.nativeElement,
        this.pokemon.sprites.front_default,
      );
    }
    this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy() {
    this.subscriptionManager.unsubscribe(this);
  }
}
