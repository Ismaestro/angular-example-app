import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  PLATFORM_ID,
  resource,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CropImageService } from '~features/pokemon/services/crop-image.service';

@Component({
  selector: 'app-pokemon-image',
  templateUrl: './pokemon-image.component.html',
  styleUrl: './pokemon-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--pokemon-image-width]': 'imageWidth()',
  },
})
export class PokemonImageComponent {
  private readonly cropImageService = inject(CropImageService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly image = input<string>();
  readonly imageWidth = input('100%');
  readonly loaded = output();

  /**
   * Async derived state: it is recomputed every time the image changes, and a stale crop is
   * discarded. Cropping needs a canvas, so on the server the resource stays idle.
   */
  readonly croppedImage = resource({
    params: () => {
      const image = this.image();
      return this.isBrowser && image ? image : undefined;
    },
    loader: async ({ params }) => this.cropImageService.getCroppedImageUrl(params),
  });
}
