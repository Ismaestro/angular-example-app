import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthRepository } from '~modules/auth/store/auth.repository';
import { AppConfig } from '../../../../configs/app.config';

@Component({
  selector: 'app-error404-page',
  templateUrl: './error404-page.component.html',
  styleUrls: ['./error404-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Error404PageComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  urlToRedirect: string;

  // eslint-disable-next-line max-params
  constructor(
    private renderer: Renderer2,
    private authRepository: AuthRepository,
    private document: Document,
    @Inject(LOCALE_ID) public locale: string,
  ) {
    this.urlToRedirect = this.locale !== AppConfig.defaultLang ? `/${locale}` : '/';
  }

  ngOnInit() {
    this.authRepository
      .isLoggedIn()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.renderer.addClass(this.document.body, 'bg-white');
        } else {
          this.renderer.removeClass(this.document.body, 'bg-white');
        }
      });
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'bg-white');
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
