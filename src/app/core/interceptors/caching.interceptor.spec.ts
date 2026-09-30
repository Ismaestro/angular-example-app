import type { HttpHandlerFn } from '@angular/common/http';
import { HttpContext, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { of } from 'rxjs';
import { HttpCacheService } from '~core/services/http-cache.service';
import { CACHING_ENABLED, cachingInterceptor } from './caching.interceptor';

describe('cachingInterceptor', () => {
  let next: ReturnType<typeof vi.fn> & HttpHandlerFn;

  const intercept = (request: HttpRequest<unknown>) =>
    TestBed.runInInjectionContext(() => cachingInterceptor(request, next));

  beforeEach(() => {
    next = vi.fn() as unknown as ReturnType<typeof vi.fn> & HttpHandlerFn;
  });

  it('should not cache if CACHING_ENABLED is false', () => {
    const request = new HttpRequest('GET', '/test');
    next.mockReturnValue(of(new HttpResponse({ status: 200 })));

    intercept(request).subscribe();
    intercept(request).subscribe();

    expect(next).toHaveBeenCalledTimes(2);
  });

  it('should cache and return cached response if CACHING_ENABLED is true', () => {
    const context = new HttpContext().set(CACHING_ENABLED, true);
    const request = new HttpRequest('GET', '/test', { context });
    const response = new HttpResponse({ status: 200, body: { data: 'test' } });
    next.mockReturnValue(of(response));

    intercept(request).subscribe();
    let cachedResponse: unknown;
    intercept(request).subscribe((event) => {
      cachedResponse = event;
    });

    expect(next).toHaveBeenCalledTimes(1);
    expect(cachedResponse).toEqual(response);
  });

  it('should hit the network again after the cache is cleared', () => {
    const context = new HttpContext().set(CACHING_ENABLED, true);
    const request = new HttpRequest('GET', '/test', { context });
    next.mockReturnValue(of(new HttpResponse({ status: 200 })));

    intercept(request).subscribe();
    TestBed.inject(HttpCacheService).clear();
    intercept(request).subscribe();

    expect(next).toHaveBeenCalledTimes(2);
  });
});
