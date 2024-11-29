import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { environment } from '~environments/environment.production';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private readonly document = inject(DOCUMENT);

  setCanonical(absolutePath: string): void {
    const [pathWithoutFragment] = HeaderService.normalizePath(absolutePath).split('#'),
      fullPath = `${environment.domain}/${pathWithoutFragment}`;
    this.document.querySelector('link[rel=canonical]')?.setAttribute('href', fullPath);
  }

  private static normalizePath(path: string): string {
    if (path.startsWith('/')) {
      return path.slice(1);
    }
    return path;
  }
}
