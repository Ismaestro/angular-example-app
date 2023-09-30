import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  LOCALE_ID,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthService } from '~modules/auth/shared/auth.service';
import { ObservableInput, Subject, takeUntil, throwError as observableThrowError } from 'rxjs';
import { AuthRepository } from '~modules/auth/store/auth.repository';
import EventBusEvent, {
  EventBCType,
  EventBusService,
  EventBusType,
} from '~modules/shared/services/event-bus.service';
import { AlertId, AlertService } from '~modules/shared/services/alert.service';
import { User } from '~modules/user/shared/user.model';
import { translations } from '../locale/translations';
import { AppConfig } from './configs/app.config';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { authRoutes } from '~modules/auth/shared/auth-routes';
import { Title } from '@angular/platform-browser';
import { catchError } from 'rxjs/operators';
import { HttpEvent } from '@angular/common/http';
import { HeaderComponent } from '~modules/shared/components/header/header.component';
import { SidebarComponent } from '~modules/shared/components/sidebar/sidebar.component';
import { FooterComponent } from '~modules/shared/components/footer/footer.component';
import { AlertComponent } from '~modules/shared/components/alert/alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, NgIf, HeaderComponent, SidebarComponent, FooterComponent, AlertComponent],
  standalone: true,
})
export class AppComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  user: User | undefined;
  isLoggedIn: boolean | undefined;
  isArrivalRoute: boolean;
  isLoggingOut: boolean;
  window: Window;

  // eslint-disable-next-line max-params
  constructor(
    private eventBusService: EventBusService,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private authRepository: AuthRepository,
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private document: Document,
    @Inject(LOCALE_ID) public locale: string,
  ) {
    this.isLoggingOut = false;
    this.isArrivalRoute = false;
    this.window = this.document.defaultView as Window;
  }

  ngOnInit() {
    this.checkAccessToken();
    this.subscribeForEvents();
    this.loadUserInfo();
    this.setMetaTags();
  }

  loadUserInfo() {
    this.authRepository
      .isLoggedIn()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      });

    this.authRepository.$user.pipe(takeUntil(this.destroy$)).subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  subscribeForEvents() {
    this.eventBusService.eventsBC.onmessage = event => {
      if (event.data.type === EventBCType.SESSION_CHANGED) {
        this.window.location.reload();
      }
    };

    this.eventBusService.events$.pipe(takeUntil(this.destroy$)).subscribe(event => {
      if (event.type === EventBusType.FINISH_LOGOUT) {
        this.closeSessionAndReload(event);
      }
    });

    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
      this.handleRouteEvent(event);
    });

    this.window.onfocus = () => {
      this.checkAccessToken();
    };
  }

  handleRouteEvent(event: Event) {
    if (event instanceof NavigationEnd) {
      const refreshToken = this.authRepository.getRefreshTokenValue();
      if (refreshToken) {
        const refreshTokenValue = AuthService.decodeToken(refreshToken);
        const isRefreshTokenExpired = Date.now() >= (refreshTokenValue?.exp ?? 0) * 1000;
        if (isRefreshTokenExpired && !event.url.includes(authRoutes.logout)) {
          this.router.navigate([authRoutes.logout], {
            queryParams: {
              origin: encodeURIComponent(this.window.location.href),
              alertId: AlertId.SESSION_EXPIRED,
            },
          });
        }
      }

      const alertId = this.activatedRoute.snapshot.queryParams[AppConfig.customQueryParams.alertId];
      if (alertId) {
        this.alertService.create(alertId);
      }

      this.isArrivalRoute = [
        `/${this.locale}` + authRoutes.logIn,
        `/${this.locale}` + authRoutes.register,
      ].includes(this.router.url);
    }
  }

  closeSessionAndReload(event: EventBusEvent) {
    this.isLoggingOut = true;
    this.changeDetectorRef.detectChanges();
    this.eventBusService.eventsBC.postMessage({
      type: EventBCType.SESSION_CHANGED,
    });
    this.window.location.href = (event.data as { path: string }).path;
  }

  checkAccessToken() {
    const accessToken = this.authRepository.getAccessTokenValue();
    const refreshToken = this.authRepository.getRefreshTokenValue();

    if (accessToken && refreshToken) {
      const accessTokenValue = AuthService.decodeToken(accessToken);
      const isAccessTokenExpired = Date.now() >= (accessTokenValue?.exp ?? 0) * 1000;
      const refreshTokenValue = AuthService.decodeToken(refreshToken);
      const isRefreshTokenExpired = Date.now() >= (refreshTokenValue?.exp ?? 0) * 1000;
      if (isAccessTokenExpired) {
        if (!isRefreshTokenExpired) {
          this.authService
            .refreshToken()
            .pipe(
              takeUntil(this.destroy$),
              catchError((error): ObservableInput<HttpEvent<unknown>> => {
                this.navigateToLogout();
                throw new Error(error);
              }),
            )
            .subscribe();
        } else {
          this.navigateToLogout();
          return observableThrowError(() => new Error());
        }
      }
    }

    return true;
  }

  navigateToLogout() {
    this.router.navigate([authRoutes.logout], {
      queryParams: {
        origin: encodeURIComponent(this.window.location.href),
        alertId: AlertId.SESSION_EXPIRED,
      },
    });
  }

  setMetaTags() {
    this.titleService.setTitle(translations.title);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
