import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  type ElementRef,
  inject,
  input,
  output,
  type Signal,
  viewChild,
} from '@angular/core';
import { CropImageService } from '~core/services/crop-image.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-pokemon-image',
  templateUrl: './pokemon-image.component.html',
  styleUrl: './pokemon-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgStyle],
})
export class PokemonImageComponent implements AfterViewInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly cropImageService = inject(CropImageService);

  readonly loaded = output<boolean>();
  readonly canvas: Signal<ElementRef<HTMLCanvasElement> | undefined> = viewChild('canvas');
  readonly image = input<string>();
  readonly imageWidth = input<string>('100%');

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
    this.loadCroppedImage();
  }

  loadCroppedImage() {
    const canvasElement = this.canvas();
    const imageValue = this.image();
    if (canvasElement && imageValue) {
      void this.cropImageService
        .getCroppedImageURL(canvasElement.nativeElement, imageValue)
        .then((base64Image) => {
          this.croppedBase64Image = base64Image;
          this.loaded.emit(true);
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
