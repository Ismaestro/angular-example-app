import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import type { Environment } from '~core/tokens/environment.token';
import { ENVIRONMENT } from '~core/tokens/environment.token';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private readonly environment = inject<Environment>(ENVIRONMENT);
  private readonly document = inject(DOCUMENT);

  setCanonical(absolutePath: string): void {
    const [pathWithoutFragment] = HeaderService.normalizePath(absolutePath).split('#'),
      fullPath = `${this.environment.domain}/${pathWithoutFragment}`;
    this.document.querySelector('link[rel=canonical]')?.setAttribute('href', fullPath);
  }

  private static normalizePath(path: string): string {
    if (path.startsWith('/')) {
      return path.slice(1);
    }
    return path;
  }
}
