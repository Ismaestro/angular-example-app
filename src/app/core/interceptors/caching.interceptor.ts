import type { HttpInterceptorFn } from '@angular/common/http';
import { HttpContextToken, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { of, tap } from 'rxjs';
import { HttpCacheService } from '~core/services/http-cache.service';

export const CACHING_ENABLED = new HttpContextToken<boolean>(() => false);

export const cachingInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.context.get(CACHING_ENABLED)) {
    return next(request);
  }

  const httpCache = inject(HttpCacheService);
  const cachedResponse = httpCache.get(request.urlWithParams);
  if (cachedResponse) {
    return of(cachedResponse);
  }

  return next(request).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        httpCache.set(request.urlWithParams, event);
      }
    }),
  );
};
