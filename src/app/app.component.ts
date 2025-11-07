import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  effect,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { translations } from '../locale/translations';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { HeaderComponent } from '~shared/components/header/header.component';
import { FooterComponent } from '~shared/components/footer/footer.component';
import { filter, map } from 'rxjs';
import { HeaderService } from '~core/services/ui/header.service';
import { ProgressBarComponent } from '~shared/components/progress-bar/progress-bar.component';
import { CookiePopupComponent } from '~shared/components/cookie-popup/cookie-popup.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToastStackComponent } from '~shared/components/toast-stack/toast-stack.component';
import { AnalyticsService } from '~core/services/analytics.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ProgressBarComponent,
    CookiePopupComponent,
    ToastStackComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly headerService = inject(HeaderService);
  private readonly metaService = inject(Meta);
  private readonly analyticsService = inject(AnalyticsService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly isBrowser = isPlatformBrowser(this.platformId);
  readonly showCookieBanner = signal(false);
  readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  constructor() {
    this._setMetaTags();

    effect(() => {
      const url = this.currentUrl();
      this.headerService.setCanonical(url);
    });
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.analyticsService.loadGA4Script();

      const COOKIES_BANNER_DELAY = 1500;
      setTimeout(() => {
        this.showCookieBanner.set(true);
      }, COOKIES_BANNER_DELAY);
    }
  }

  private _setMetaTags(): void {
    const { seoTitle, seoDescription } = translations;
    this.titleService.setTitle(seoTitle);
    this.metaService.addTags([
      {
        name: 'og:title',
        content: seoTitle,
      },
      {
        name: 'twitter:title',
        content: seoTitle,
      },
      {
        name: 'description',
        content: seoDescription,
      },
      {
        name: 'og:description',
        content: seoDescription,
      },
      {
        name: 'twitter:description',
        content: seoDescription,
      },
    ]);
  }

  focusFirstHeading(): void {
    const h1 = this.document.querySelector<HTMLHeadingElement>('h1');
    h1?.focus();
  }
}
