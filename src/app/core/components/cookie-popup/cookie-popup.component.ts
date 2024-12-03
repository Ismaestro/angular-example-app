import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import { ConsentState, CookieConsentService } from '~core/services/cookie-consent.service';

import '@shoelace-style/shoelace/dist/components/button/button.js';

@Component({
  selector: 'app-cookie-popup',
  templateUrl: './cookie-popup.component.html',
  styleUrl: './cookie-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CookiePopupComponent {
  hasAccepted = signal<boolean>(false);

  private readonly cookieConsentService = inject(CookieConsentService);

  constructor() {
    try {
      this.hasAccepted.set(this.cookieConsentService.getCookieState());
    } catch {
      this.hasAccepted.set(false);
    }
  }

  acceptCookies(): void {
    const cookieSaved = this.cookieConsentService.setCookieConsent(ConsentState.GRANTED);
    if (cookieSaved) {
      this.hasAccepted.set(true);
    }
  }
}
