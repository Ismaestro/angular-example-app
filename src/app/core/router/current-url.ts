import type { Signal } from '@angular/core';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

/**
 * `router.url` is a plain property: reading it from a template or a `computed` does not track
 * navigations, so with OnPush and zoneless change detection the view would not be updated.
 * This signal does track them. It must be called in an injection context.
 */
export function injectCurrentUrl(): Signal<string> {
  const router = inject(Router);

  return toSignal(
    router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: router.url },
  );
}
