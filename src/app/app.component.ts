import { ChangeDetectionStrategy, Component, DOCUMENT, effect, inject } from '@angular/core';
import { translations } from '../locale/translations';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { HeaderComponent } from '~core/components/header/header.component';
import { FooterComponent } from '~core/components/footer/footer.component';

import { filter, map } from 'rxjs';
import { HeaderService } from '~core/services/ui/header.service';
import { ProgressBarComponent } from '~core/components/progress-bar/progress-bar.component';
import { CookiePopupComponent } from '~core/components/cookie-popup/cookie-popup.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToastStackComponent } from '~core/components/toast-stack/toast-stack.component';

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
export class AppComponent {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly headerService = inject(HeaderService);
  private readonly metaService = inject(Meta);

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
