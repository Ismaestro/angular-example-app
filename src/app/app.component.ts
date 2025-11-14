import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '~shared/components/header/header.component';
import { FooterComponent } from '~shared/components/footer/footer.component';
import { filter, map } from 'rxjs';
import { HeaderService } from '~core/services/ui/header.service';
import { CookiePopupComponent } from '~shared/components/cookie-popup/cookie-popup.component';
import { toSignal } from '@angular/core/rxjs-interop';
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
  private readonly router = inject(Router);
  private readonly headerService = inject(HeaderService);
  private readonly seoService = inject(SeoService);
  private readonly analyticsService = inject(AnalyticsService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly isBrowser = isPlatformBrowser(this.platformId);
  readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  constructor() {
    this.seoService.setBasicTags();
    effect(() => {
      const url = this.currentUrl();
      this.headerService.setCanonical(url);
    });
    if (this.isBrowser) {
      afterNextRender(() => {
        this.analyticsService.loadGA4Script();
      });
    }
  }
}
