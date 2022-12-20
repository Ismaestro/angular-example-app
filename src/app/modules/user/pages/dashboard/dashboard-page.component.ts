import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  LOCALE_ID,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthRepository } from '~modules/auth/store/auth.repository';
import { Subject, takeUntil } from 'rxjs';
import { User } from '~modules/user/shared/user.model';
import { DOCUMENT, NgIf } from '@angular/common';
import { AppConfig } from '../../../../configs/app.config';
import { userRoutes } from '~modules/user/shared/user-routes';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, RouterLinkWithHref],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  user: User | undefined;
  window: Window;

  // eslint-disable-next-line max-params
  constructor(
    private authRepository: AuthRepository,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(LOCALE_ID) public locale: string,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.window = this.document.defaultView as Window;
  }

  ngOnInit() {
    this.authRepository.$user.pipe(takeUntil(this.destroy$)).subscribe(user => {
      if (user) {
        this.user = user;
        this.checkUserLanguage();
      }
    });
  }

  checkUserLanguage() {
    if (this.user?.lang !== this.locale) {
      this.window.location.href =
        (this.user?.lang && this.user.lang !== AppConfig.defaultLang ? `/${this.user.lang}` : '') +
        userRoutes.dashboard;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
