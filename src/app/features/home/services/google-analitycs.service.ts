import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '~environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiBaseUrl;

  getRealtimeUsers(): Observable<{ activeUsers: number }> {
    const getRealtimeUsersEndpoint = `${this.apiUrl}/v1/analytics/realtime-users`;
    return this.httpClient.get<{ activeUsers: number }>(getRealtimeUsersEndpoint);
  }
}
