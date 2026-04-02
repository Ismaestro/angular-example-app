import type { HttpHandlerFn } from '@angular/common/http';
import { HttpContext, HttpRequest, HttpResponse } from '@angular/common/http';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { of } from 'rxjs';
import { CACHING_ENABLED, cachingInterceptor, clearCache } from './caching.interceptor';

describe('cachingInterceptor', () => {
  let next: ReturnType<typeof vi.fn> & HttpHandlerFn;

  beforeEach(() => {
    next = vi.fn() as unknown as ReturnType<typeof vi.fn> & HttpHandlerFn;
    clearCache();
  });

  it('should not cache if CACHING_ENABLED is false', () => {
    const request = new HttpRequest('GET', '/test');
    next.mockReturnValue(of(new HttpResponse({ status: 200 })));

    cachingInterceptor(request, next).subscribe();

    expect(next).toHaveBeenCalledWith(request);
  });

  it('should cache and return cached response if CACHING_ENABLED is true', () => {
    const context = new HttpContext().set(CACHING_ENABLED, true);
    const request = new HttpRequest('GET', '/test', { context });
    const response = new HttpResponse({ status: 200, body: { data: 'test' } });

    next.mockReturnValue(of(response));

    // First call - should go to next
    cachingInterceptor(request, next).subscribe();
    expect(next).toHaveBeenCalledTimes(1);

    // Second call - should return cached
    cachingInterceptor(request, next).subscribe((cachedResponse) => {
      expect(cachedResponse).toEqual(response);
    });
    expect(next).toHaveBeenCalledTimes(1); // Still 1
  });

  it('should clear cache', () => {
    const context = new HttpContext().set(CACHING_ENABLED, true);
    const request = new HttpRequest('GET', '/test', { context });
    const response = new HttpResponse({ status: 200 });

    next.mockReturnValue(of(response));

    cachingInterceptor(request, next).subscribe();
    expect(next).toHaveBeenCalledTimes(1);

    clearCache();

    cachingInterceptor(request, next).subscribe();
    expect(next).toHaveBeenCalledTimes(2);
  });
});
