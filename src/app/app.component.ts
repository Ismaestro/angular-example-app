import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { translations } from '../locale/translations';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from '~core/components/header/header.component';
import { FooterComponent } from '~core/components/footer/footer.component';
import { DOCUMENT } from '@angular/common';
import { filter, map } from 'rxjs';
import { HeaderService } from '~core/services/ui/header.service';
import { ProgressBarComponent } from '~core/components/progress-bar/progress-bar.component';
import { CookiePopupComponent } from '~core/components/cookie-popup/cookie-popup.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToastStackComponent } from '~core/components/toast-stack/toast-stack.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ProgressBarComponent,
    CookiePopupComponent,
    ToastStackComponent,
  ],
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly headerService = inject(HeaderService);

  readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  constructor() {
    this.titleService.setTitle(translations.title);

    effect(() => {
      const url = this.currentUrl();
      this.headerService.setCanonical(url);
    });
  }

  focusFirstHeading(): void {
    const h1 = this.document.querySelector<HTMLHeadingElement>('h1');
    h1?.focus();
  }
}
