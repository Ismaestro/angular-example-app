import { inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '~core/providers/local-storage';
import { ConsentState } from '~core/enums/consent-state.enums';
import { CONSENT_COOKIE_KEY, CONSENT_COOKIE_VALUE } from '~core/constants/cookie-consent.constants';

declare const window: Window &
  typeof globalThis & { gtag?: (a: string, b: string, o: object) => void };

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private readonly localStorage: Storage | null = inject(LOCAL_STORAGE);

  acceptCookies(): boolean {
    return this.setConsent(ConsentState.GRANTED);
  }

  getCookieState(): boolean {
    try {
      return this.localStorage?.getItem(CONSENT_COOKIE_KEY) === CONSENT_COOKIE_VALUE;
    } catch {
      return false;
    }
  }

  private setConsent(state: ConsentState): boolean {
    if (!this.setConsentInLocalStorage()) return false;
    return this.updateGtagConsent(state);
  }

  private setConsentInLocalStorage(): boolean {
    try {
      this.localStorage?.setItem(CONSENT_COOKIE_KEY, CONSENT_COOKIE_VALUE);
      return true;
    } catch {
      return false;
    }
  }

  private buildGtagConsentOptions(state: ConsentState) {
    return {
      ad_user_data: state,
      ad_personalization: state,
      ad_storage: state,
      analytics_storage: state,
    };
  }

  private updateGtagConsent(state: ConsentState): boolean {
    try {
      if (!window.gtag) return true;

      const options = this.buildGtagConsentOptions(state);

      if (state === ConsentState.DENIED) {
        window.gtag('consent', 'default', { ...options, wait_for_update: 500 });
      } else {
        window.gtag('consent', 'update', options);
      }

      return true;
    } catch {
      return false;
    }
  }
}
