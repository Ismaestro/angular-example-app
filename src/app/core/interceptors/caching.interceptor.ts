import {
  HttpContextToken,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

export const CACHING_ENABLED = new HttpContextToken<boolean>(() => true);

const cache = new Map<string, HttpResponse<unknown>>();

export function cachingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  if (req.context.get(CACHING_ENABLED)) {
    const cachedResponse = cache.get(req.urlWithParams);
    if (cachedResponse) {
      return of(cachedResponse.clone());
    }

    return next(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          cache.set(req.urlWithParams, event.clone());
        }
      }),
    );
  } else {
    return next(req);
  }
}
