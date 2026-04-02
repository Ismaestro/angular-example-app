import { DOCUMENT } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Language } from '~core/enums/language.enums';
import { Locale } from '~core/enums/locale.enums';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;
  let mockRouter: { navigate: ReturnType<typeof vi.fn> };
  let mockDocument: {
    defaultView: { scrollTo: ReturnType<typeof vi.fn> };
    location: { href: string };
  };

  const setupService = (localeId: string) => {
    mockRouter = {
      navigate: vi.fn().mockResolvedValue(true),
    };

    mockDocument = {
      defaultView: {
        scrollTo: vi.fn(),
      },
      location: {
        href: '',
      },
    };

    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: LOCALE_ID, useValue: localeId },
        { provide: Router, useValue: mockRouter },
        { provide: DOCUMENT, useValue: mockDocument },
      ],
    });

    service = TestBed.inject(LanguageService);
  };

  describe('convertLocaleToAcceptLanguage', () => {
    it('should return ES_ES when locale is es', () => {
      setupService(Locale.ES);
      expect(service.convertLocaleToAcceptLanguage()).toBe(Language.ES_ES);
    });

    it('should return EN_US when locale is not es', () => {
      setupService(Locale.EN);
      expect(service.convertLocaleToAcceptLanguage()).toBe(Language.EN_US);
    });
  });

  describe('navigateWithUserLanguage', () => {
    beforeEach(() => {
      vi.stubGlobal('location', { href: '' });
    });

    it('should navigate and scroll when locale matches language (ES)', async () => {
      setupService(Locale.ES);
      service.navigateWithUserLanguage(Language.ES_ES, '/test');

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/test']);

      // Wait for promise resolution
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 0);
      });
      expect(mockDocument.defaultView.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });

    it('should navigate and scroll when locale matches language (EN)', async () => {
      setupService(Locale.EN);
      service.navigateWithUserLanguage(Language.EN_US, '/test');

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/test']);

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 0);
      });
      expect(mockDocument.defaultView.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });

    it('should change window.location when locale does not match language (redirect to ES)', () => {
      setupService(Locale.EN);
      service.navigateWithUserLanguage(Language.ES_ES, '/test');

      expect(window.location.href).toBe('/es/test');
    });

    it('should change window.location when locale does not match language (redirect to EN/default)', () => {
      setupService(Locale.ES);
      service.navigateWithUserLanguage(Language.EN_US, '/test');

      expect(window.location.href).toBe('/test');
    });
  });
});
