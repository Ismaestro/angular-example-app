import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AnalyticsService } from './analytics.service';
import { ENVIRONMENT } from '~core/tokens/environment.token';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let mockDocument: {
    createElement: ReturnType<typeof vi.fn>;
    getElementById: ReturnType<typeof vi.fn>;
    head: { appendChild: ReturnType<typeof vi.fn> };
  };

  beforeEach(() => {
    mockDocument = {
      createElement: vi.fn(),
      getElementById: vi.fn(),
      head: {
        appendChild: vi.fn(),
      },
    };

    TestBed.configureTestingModule({
      providers: [
        AnalyticsService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: DOCUMENT, useValue: mockDocument },
        { provide: ENVIRONMENT, useValue: { apiBaseUrl: 'https://api.example.com' } },
      ],
    });

    service = TestBed.inject(AnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadGA4Script', () => {
    it('should create and append GA4 script', () => {
      const mockScript = { async: false, src: '' };
      mockDocument.createElement.mockReturnValue(mockScript);

      service.loadGA4Script();

      expect(mockDocument.createElement).toHaveBeenCalledWith('script');
      expect(mockScript.async).toBe(true);
      expect(mockScript.src).toContain('googletagmanager.com/gtag/js');
      expect(mockDocument.head.appendChild).toHaveBeenCalledWith(mockScript);
    });
  });

  describe('getRealtimeUsersResource', () => {
    it('should return a resource with default value', () => {
      const resource = TestBed.runInInjectionContext(() => service.getRealtimeUsersResource());
      expect(resource.value()).toEqual({ activeUsers: 1 });
    });
  });
});
