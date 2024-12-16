import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  type ElementRef,
  inject,
  input,
  type Signal,
  viewChild,
} from '@angular/core';
import type { Pokemon } from '~features/pokemon-detail/types/pokemon.type';
import { CropImageService } from '~core/services/crop-image.service';

@Component({
  selector: 'app-pokemon-battlefield',
  templateUrl: './pokemon-battlefield.component.html',
  styleUrl: './pokemon-battlefield.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonBattlefieldComponent implements AfterViewInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly cropImageService = inject(CropImageService);

  pokemon = input<Pokemon>();
  canvas: Signal<ElementRef<HTMLCanvasElement> | undefined> = viewChild('canvas');
  croppedBase64Image!: string;
  croppedImageLoaded = false;

  constructor() {
    effect(() => {
      this.resetState();
      if (this.canvas()) {
        this.loadCroppedImage();
      }
    });
  }

  ngAfterViewInit() {
    this.resetState();
    this.loadCroppedImage();
  }

  loadCroppedImage() {
    const canvasElement = this.canvas();
    const pokemonValue = this.pokemon();
    if (canvasElement && pokemonValue) {
      void this.cropImageService
        .getCroppedImageURL(canvasElement.nativeElement, pokemonValue.sprites.front_default)
        .then((base64Image) => {
          this.croppedBase64Image = base64Image;
          this.changeDetectorRef.markForCheck();
          return base64Image;
        });
    }
  }

  private resetState() {
    this.croppedBase64Image = '';
    this.croppedImageLoaded = false;
    this.changeDetectorRef.markForCheck();
  }
}
