import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  private readonly apiUrl = 'https://nestjs-example-app.fly.dev/v1/analytics/realtime-users';
  private readonly httpClient = inject(HttpClient);

  getRealtimeUsers(): Observable<{ activeUsers: number }> {
    return this.httpClient.get<{ activeUsers: number }>(this.apiUrl);
  }
}
