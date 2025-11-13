import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import { CookieConsentService } from '~core/services/storage/cookie-consent.service';

import '@shoelace-style/shoelace/dist/components/button/button.js';

@Component({
  selector: 'app-cookie-popup',
  templateUrl: './cookie-popup.component.html',
  styleUrl: './cookie-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CookiePopupComponent {
  private readonly cookieConsentService = inject(CookieConsentService);

  readonly hasAccepted = signal(this.cookieConsentService.getCookieState());

  acceptCookies(): void {
    const areCookiesAccepted = this.cookieConsentService.acceptCookies();
    if (areCookiesAccepted) {
      this.hasAccepted.set(true);
    }
  }
}
