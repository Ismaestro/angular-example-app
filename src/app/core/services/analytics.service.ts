import { DOCUMENT, inject, Injectable } from '@angular/core';
import { httpResource, type HttpResourceRef } from '@angular/common/http';
import { getEndpoints } from '~core/constants/endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly endpoints = getEndpoints();
  private readonly document = inject(DOCUMENT);

  loadGA4Script() {
    const script = this.document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-9SZHZ6B85Z`;
    // eslint-disable-next-line unicorn/prefer-dom-node-append
    this.document.head.appendChild(script);
  }

  getRealtimeUsersResource(): HttpResourceRef<{ activeUsers: number }> {
    return httpResource<{ activeUsers: number }>(
      () => ({ url: this.endpoints.analytics.v1.realtimeUsers }),
      {
        defaultValue: { activeUsers: 1 },
      },
    );
  }
}
