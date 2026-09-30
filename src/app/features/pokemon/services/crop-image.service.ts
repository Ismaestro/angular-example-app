import { DOCUMENT, inject, Injectable } from '@angular/core';

type CropBoundaries = { top: number; bottom: number; left: number; right: number };

/** Crops the transparent margins of an image. It needs a canvas, so it only works in the browser */
@Injectable({
  providedIn: 'root',
})
export class CropImageService {
  private readonly document = inject(DOCUMENT);

  /** Resolves with the image cropped to its non-transparent content, as a data URL */
  async getCroppedImageUrl(imageUrl: string): Promise<string> {
    const image = await this.loadImage(imageUrl);
    const canvas = this.createCanvas(image.width, image.height);
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) {
      throw new Error('Canvas context not found');
    }

    context.drawImage(image, 0, 0);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    return this.createCroppedImage(image, this.findCropBoundaries(imageData));
  }

  private async loadImage(imageUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = this.document.createElement('img');
      image.crossOrigin = 'Anonymous';
      image.addEventListener('load', () => {
        resolve(image);
      });
      image.addEventListener('error', () => {
        reject(new Error('Image failed to load'));
      });
      image.src = imageUrl;
    });
  }

  private createCanvas(width: number, height: number): HTMLCanvasElement {
    const canvas = this.document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  private findCropBoundaries({ data, width, height }: ImageData): CropBoundaries {
    let bottom = 0,
      left = width,
      right = 0,
      top = height;

    for (let row = 0; row < height; row++) {
      for (let column = 0; column < width; column++) {
        const alpha = data[(row * width + column) * 4 + 3];
        if (alpha > 0) {
          // Update boundaries for non-transparent pixel
          top = Math.min(top, row);
          bottom = Math.max(bottom, row);
          left = Math.min(left, column);
          right = Math.max(right, column);
        }
      }
    }

    return { top, bottom, left, right };
  }

  private createCroppedImage(
    image: HTMLImageElement,
    { top, bottom, left, right }: CropBoundaries,
  ): string {
    const croppedWidth = Math.max(right - left, 1);
    const croppedHeight = Math.max(bottom - top, 1);
    const croppedCanvas = this.createCanvas(croppedWidth, croppedHeight);
    const croppedContext = croppedCanvas.getContext('2d');
    if (!croppedContext) {
      return '';
    }

    croppedContext.drawImage(
      image,
      left,
      top,
      croppedWidth,
      croppedHeight,
      0,
      0,
      croppedWidth,
      croppedHeight,
    );
    return croppedCanvas.toDataURL();
  }
}
