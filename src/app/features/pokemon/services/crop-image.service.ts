import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CropImageService {
  async getCroppedImageURL(canvas: HTMLCanvasElement, imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) {
        reject(new Error('Canvas context not found'));
        return;
      }

      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.src = imageUrl;
      image.addEventListener('load', () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        const croppedImageUrl = this.cropImageToFitContent({ context, image, canvas });
        resolve(croppedImageUrl);
      });

      image.addEventListener('error', () => {
        reject(new Error('Image failed to load'));
      });
    });
  }

  private cropImageToFitContent({
    context,
    image,
    canvas,
  }: {
    context: CanvasRenderingContext2D;
    image: HTMLImageElement;
    canvas: HTMLCanvasElement;
  }): string {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const { top, bottom, left, right } = this.findCropBoundaries(imageData, canvas);
    const croppedWidth = Math.max(right - left, 1);
    const croppedHeight = Math.max(bottom - top, 1);
    return this.createCroppedImage({ image, left, top, croppedWidth, croppedHeight });
  }

  // eslint-disable-next-line max-statements
  private findCropBoundaries(imageData: ImageData, canvas: HTMLCanvasElement) {
    let bottom = 0,
      left = canvas.width,
      right = 0,
      top = canvas.height;

    for (let row = 0; row < canvas.height; row++) {
      for (let column = 0; column < canvas.width; column++) {
        const index = (row * canvas.width + column) * 4;
        const alpha = imageData.data[index + 3];
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

  // eslint-disable-next-line max-lines-per-function
  private createCroppedImage({
    image,
    left,
    top,
    croppedWidth,
    croppedHeight,
  }: {
    image: HTMLImageElement;
    left: number;
    top: number;
    croppedWidth: number;
    croppedHeight: number;
  }): string {
    const croppedCanvas = document.createElement('canvas');
    const croppedContext = croppedCanvas.getContext('2d');
    if (!croppedContext) {
      return '';
    }
    croppedCanvas.width = croppedWidth;
    croppedCanvas.height = croppedHeight;

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
