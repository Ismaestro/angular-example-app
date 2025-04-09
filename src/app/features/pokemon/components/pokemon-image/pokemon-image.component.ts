import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  type ElementRef,
  inject,
  input,
  output,
  signal,
  type Signal,
  viewChild,
} from '@angular/core';
import { NgStyle } from '@angular/common';
import { CropImageService } from '~features/pokemon/services/crop-image.service';

@Component({
  selector: 'app-pokemon-image',
  templateUrl: './pokemon-image.component.html',
  styleUrl: './pokemon-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgStyle],
})
export class PokemonImageComponent implements AfterViewInit {
  private readonly cropImageService = inject(CropImageService);

  readonly loaded = output<boolean>();
  readonly canvas: Signal<ElementRef<HTMLCanvasElement> | undefined> = viewChild('canvas');
  readonly image = input<string>();
  readonly imageWidth = input<string>('100%');
  readonly croppedBase64Image = signal('');
  readonly croppedImageLoaded = signal(false);

  constructor() {
    effect(() => {
      this.resetState();
      if (this.canvas()) {
        this.loadCroppedImage();
      }
    });
  }

  ngAfterViewInit() {
    this.loadCroppedImage();
  }

  loadCroppedImage() {
    const canvasElement = this.canvas();
    const imageValue = this.image();
    if (canvasElement && imageValue) {
      void this.cropImageService
        .getCroppedImageURL(canvasElement.nativeElement, imageValue)
        .then((base64Image) => {
          this.croppedBase64Image.set(base64Image);
          this.loaded.emit(true);
          return base64Image;
        });
    }
  }

  private resetState() {
    this.croppedBase64Image.set('');
    this.croppedImageLoaded.set(false);
  }
}
