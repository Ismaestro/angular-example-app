import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '~shared/components/header/header.component';
import { FooterComponent } from '~shared/components/footer/footer.component';
import { HeaderService } from '~core/services/ui/header.service';
import { CookiePopupComponent } from '~shared/components/cookie-popup/cookie-popup.component';
import { injectCurrentUrl } from '~core/router/current-url';
import { ToastStackComponent } from '~shared/components/toast-stack/toast-stack.component';
import { AnalyticsService } from '~core/services/analytics.service';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '~core/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CookiePopupComponent,
    ToastStackComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly headerService = inject(HeaderService);
  private readonly seoService = inject(SeoService);
  private readonly analyticsService = inject(AnalyticsService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly isBrowser = isPlatformBrowser(this.platformId);
  readonly currentUrl = injectCurrentUrl();

  readonly canonicalEffect = effect(() => {
    const url = this.currentUrl();
    this.headerService.setCanonical(url);
  });

  constructor() {
    this.seoService.setBasicTags();
    if (this.isBrowser) {
      afterNextRender(() => {
        this.analyticsService.loadGtmScript();
      });
    }
  }
}
