import type { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * In-memory cache for HTTP responses. It lives in the injector (not in a module-level variable),
 * so every application instance (each SSR render, each test) gets its own isolated cache.
 */
@Injectable({ providedIn: 'root' })
export class HttpCacheService {
  private readonly cache = new Map<string, HttpResponse<unknown>>();

  get(key: string): HttpResponse<unknown> | undefined {
    return this.cache.get(key)?.clone();
  }

  set(key: string, response: HttpResponse<unknown>): void {
    this.cache.set(key, response.clone());
  }

  clear(): void {
    this.cache.clear();
  }
}
