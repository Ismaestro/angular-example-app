import { inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '~core/providers/local-storage';

declare const window: Window &
  // eslint-disable-next-line @typescript-eslint/max-params
  typeof globalThis & { gtag?: (a: string, b: string, o: object) => void };

const CONSENT_COOKIE_KEY = 'isCookiesConsentAccepted';
const CONSENT_COOKIE_VALUE = 'true';

export enum ConsentState {
  DENIED = 'denied',
  GRANTED = 'granted',
}

@Injectable({
  providedIn: 'root',
})
export class CookieConsentService {
  private readonly localStorage: Storage | null = inject(LOCAL_STORAGE);

  setCookieConsent(state: ConsentState): boolean {
    if (!this.setConsentInLocalStorage()) {
      return false;
    }
    return this.updateGtagConsent(state);
  }

  getCookieState(): boolean {
    try {
      return this.localStorage?.getItem(CONSENT_COOKIE_KEY) === CONSENT_COOKIE_VALUE;
    } catch {
      return false;
    }
  }

  private setConsentInLocalStorage(): boolean {
    try {
      this.localStorage?.setItem(CONSENT_COOKIE_KEY, CONSENT_COOKIE_VALUE);
      return true;
    } catch {
      return false;
    }
  }

  private updateGtagConsent(state: ConsentState): boolean {
    try {
      if (window.gtag) {
        const consentOptions = {
          /* eslint-disable camelcase*/
          ad_user_data: state,
          ad_personalization: state,
          ad_storage: state,
          analytics_storage: state,
        };

        if (state === ConsentState.DENIED) {
          window.gtag('consent', 'default', {
            ...consentOptions,
            wait_for_update: 500,
            /* eslint-enable camelcase*/
          });
        } else {
          window.gtag('consent', 'update', {
            ...consentOptions,
          });
        }
      }
      return true;
    } catch {
      return false;
    }
  }
}
