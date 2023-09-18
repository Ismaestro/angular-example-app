import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { EventBusService, EventBusType } from '~modules/shared/services/event-bus.service';
import { AppConfig } from '../../../../configs/app.config';
import { AlertService } from '~modules/shared/services/alert.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthRepository } from '~modules/auth/store/auth.repository';
import { environment } from '~environments/environment';
import { ActivatedRoute } from '@angular/router';
import { authRoutes } from '~modules/auth/shared/auth-routes';

@Component({
  selector: 'app-logout-page',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LogoutPageComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  window: Window;

  // eslint-disable-next-line max-params
  constructor(
    private alertService: AlertService,
    private eventBusService: EventBusService,
    private authRepository: AuthRepository,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private document: Document,
  ) {
    this.window = this.document.defaultView as Window;
  }

  ngOnInit(): void {
    const origin = this.activatedRoute.snapshot.queryParams[AppConfig.customQueryParams.origin];
    const alertId = this.activatedRoute.snapshot.queryParams[AppConfig.customQueryParams.alertId];

    this.authRepository.$user.pipe(takeUntil(this.destroy$)).subscribe(user => {
      let langToRedirect = '';
      if (user && user.language !== AppConfig.defaultLang) {
        langToRedirect = `/${user.language}`;
      }

      this.authRepository.clear();

      const path = new URL(`${environment.domain}${langToRedirect || ''}${authRoutes.logIn}`);
      if (origin) {
        path.searchParams.append(AppConfig.customQueryParams.origin, origin);
      }
      if (alertId) {
        path.searchParams.append(AppConfig.customQueryParams.alertId, alertId);
      }

      this.eventBusService.emit({
        type: EventBusType.FINISH_LOGOUT,
        data: { path },
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
