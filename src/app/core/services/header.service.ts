import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { environment } from '~environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class HeaderService {
  private readonly document = inject(DOCUMENT);

  setCanonical(absolutePath: string): void {
    const pathWithoutFragment = this.normalizePath(absolutePath).split('#')[0];
    const fullPath = `${environment.domain}/${pathWithoutFragment}`;
    this.document.querySelector('link[rel=canonical]')?.setAttribute('href', fullPath);
  }

  private normalizePath(path: string): string {
    if (path[0] === '/') {
      return path.substring(1);
    }
    return path;
  }
}
