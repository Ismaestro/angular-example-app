import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AnalyticsService } from './analytics.service';
import { ENVIRONMENT } from '~core/tokens/environment.token';

const REALTIME_USERS_URL = 'https://api.example.com/v1/analytics/realtime-users';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ENVIRONMENT, useValue: { apiBaseUrl: 'https://api.example.com' } },
      ],
    });

    service = TestBed.inject(AnalyticsService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getRealtimeUsersResource', () => {
    it('should start with a default value', () => {
      const resource = TestBed.runInInjectionContext(() => service.getRealtimeUsersResource());

      expect(resource.value()).toEqual({ activeUsers: 1 });
    });

    it('should poll the realtime users and keep the last value when a poll fails', async () => {
      const resource = TestBed.runInInjectionContext(() => service.getRealtimeUsersResource(5000));
      TestBed.tick();

      await vi.advanceTimersByTimeAsync(0);
      httpTesting.expectOne(REALTIME_USERS_URL).flush({ activeUsers: 5 });
      await vi.advanceTimersByTimeAsync(0);
      expect(resource.value()).toEqual({ activeUsers: 5 });

      await vi.advanceTimersByTimeAsync(5000);
      httpTesting
        .expectOne(REALTIME_USERS_URL)
        .flush(null, { status: 500, statusText: 'Server Error' });
      await vi.advanceTimersByTimeAsync(0);
      expect(resource.value()).toEqual({ activeUsers: 5 });

      await vi.advanceTimersByTimeAsync(5000);
      httpTesting.expectOne(REALTIME_USERS_URL).flush({ activeUsers: 7 });
      await vi.advanceTimersByTimeAsync(0);
      expect(resource.value()).toEqual({ activeUsers: 7 });
    });
  });
});
