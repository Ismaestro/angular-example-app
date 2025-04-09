import { Injectable } from '@angular/core';
import { httpResource, type HttpResourceRef } from '@angular/common/http';
import { environment } from '~environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly apiUrl = environment.apiBaseUrl;

  getRealtimeUsersResource(): HttpResourceRef<{ activeUsers: number }> {
    return httpResource<{ activeUsers: number }>(`${this.apiUrl}/v1/analytics/realtime-users`, {
      defaultValue: { activeUsers: 1 },
    });
  }
}
