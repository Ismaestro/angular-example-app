import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CookieConsentService } from './cookie-consent.service';
import { ConsentState } from '~core/enums/consent-state.enums';
import { LOCAL_STORAGE } from '~core/providers/local-storage';

describe('CookieConsentService', () => {
  let service: CookieConsentService;
  let mockLocalStorage: { getItem: ReturnType<typeof vi.fn>; setItem: ReturnType<typeof vi.fn> };

  const CONSENT_COOKIE_KEY = 'isCookiesConsentAccepted';
  const CONSENT_COOKIE_VALUE = 'true';

  beforeEach(() => {
    mockLocalStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [CookieConsentService, { provide: LOCAL_STORAGE, useValue: mockLocalStorage }],
    });

    service = TestBed.inject(CookieConsentService);

    // Mock window.gtag
    (window as unknown as { gtag?: ReturnType<typeof vi.fn> }).gtag = vi.fn();
  });

  afterEach(() => {
    delete (window as unknown as { gtag?: ReturnType<typeof vi.fn> }).gtag;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCookieState', () => {
    it('should return true if consent is in localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue(CONSENT_COOKIE_VALUE);
      expect(service.getCookieState()).toBe(true);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(CONSENT_COOKIE_KEY);
    });

    it('should return false if consent is NOT in localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      expect(service.getCookieState()).toBe(false);
    });

    it('should return false if localStorage throws', () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('boom');
      });
      expect(service.getCookieState()).toBe(false);
    });
  });

  describe('acceptCookies', () => {
    it('should set consent in localStorage and update gtag', () => {
      const result = service.acceptCookies();

      expect(result).toBe(true);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        CONSENT_COOKIE_KEY,
        CONSENT_COOKIE_VALUE,
      );
      expect((window as unknown as { gtag: ReturnType<typeof vi.fn> }).gtag).toHaveBeenCalledWith(
        'consent',
        'update',
        {
          ad_user_data: ConsentState.GRANTED,
          ad_personalization: ConsentState.GRANTED,
          ad_storage: ConsentState.GRANTED,
          analytics_storage: ConsentState.GRANTED,
        },
      );
    });

    it('should return false if localStorage setItem throws', () => {
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('boom');
      });

      const result = service.acceptCookies();
      expect(result).toBe(false);
    });

    it('should return true even if gtag is missing', () => {
      delete (window as unknown as { gtag?: ReturnType<typeof vi.fn> }).gtag;
      const result = service.acceptCookies();
      expect(result).toBe(true);
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });
  });
});
