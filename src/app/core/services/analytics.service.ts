import { Injectable } from '@angular/core';
import { httpResource, type HttpResourceRef } from '@angular/common/http';
import { getEndpoints } from '~core/constants/endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly endpoints = getEndpoints();

  getRealtimeUsersResource(): HttpResourceRef<{ activeUsers: number }> {
    return httpResource<{ activeUsers: number }>(this.endpoints.analytics.v1.realtimeUsers, {
      defaultValue: { activeUsers: 1 },
    });
  }
}
