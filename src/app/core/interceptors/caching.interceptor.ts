import type { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { HttpContextToken, HttpResponse } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { of, tap } from 'rxjs';

export const CACHING_ENABLED = new HttpContextToken<boolean>(() => false);

const cache = new Map<string, HttpResponse<unknown>>();

export function cachingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  if (request.context.get(CACHING_ENABLED)) {
    const cachedResponse = cache.get(request.urlWithParams);
    if (cachedResponse) {
      return of(cachedResponse.clone());
    }

    return next(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          cache.set(request.urlWithParams, event.clone());
        }
      }),
    );
  }

  return next(request);
}

export function clearCache() {
  cache.clear();
}
