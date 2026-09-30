import { DOCUMENT, inject, Injectable, type ResourceRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, switchMap, timer } from 'rxjs';
import { getEndpoints } from '~core/constants/endpoints.constants';

type RealtimeUsers = { activeUsers: number };

const REALTIME_USERS_REFRESH_MS = 5000;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly endpoints = getEndpoints();
  private readonly document = inject(DOCUMENT);
  private readonly http = inject(HttpClient);

  loadGtmScript() {
    // eslint-disable-next-line no-multi-assign
    const dataLayer = ((window as unknown as { dataLayer?: unknown[] }).dataLayer ??= []);
    dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const script = this.document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=GTM-TJQKDC6M`;
    this.document.head.appendChild(script);
  }

  /**
   * A streaming resource: its value is updated on every poll, and polling stops when the
   * component that created it is destroyed. Must be called in an injection context.
   */
  getRealtimeUsersResource(refreshMs = REALTIME_USERS_REFRESH_MS): ResourceRef<RealtimeUsers> {
    return rxResource({
      stream: () =>
        timer(0, refreshMs).pipe(
          switchMap(() =>
            // A failed poll keeps the last known value instead of stopping the polling
            this.http
              .get<RealtimeUsers>(this.endpoints.analytics.v1.realtimeUsers)
              .pipe(catchError(() => EMPTY)),
          ),
        ),
      defaultValue: { activeUsers: 1 },
    });
  }
}
