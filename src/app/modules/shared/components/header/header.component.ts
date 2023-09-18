import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthRepository } from '~modules/auth/store/auth.repository';
import { EventBusService, EventBusType } from '~modules/shared/services/event-bus.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from '~modules/user/shared/user.model';
import { CommonModule } from '@angular/common';
import { AlertService } from '~modules/shared/services/alert.service';
import { AlertComponent } from '~modules/shared/components/alert/alert.component';
import { userRoutes } from '~modules/user/shared/user-routes';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { authRoutes } from '~modules/auth/shared/auth-routes';
import { environment } from '~environments/environment';
import { appRoutes } from '../../../../app-routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, AlertComponent, RouterModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  environment: typeof environment;
  currentUrl: string;
  userRoutes: typeof userRoutes;
  appRoutes: typeof appRoutes;
  user: User | undefined;
  window: Window;

  // eslint-disable-next-line max-params
  constructor(
    private eventBusService: EventBusService,
    private alertService: AlertService,
    private authRepository: AuthRepository,
    public router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private document: Document,
  ) {
    this.environment = environment;
    this.userRoutes = userRoutes;
    this.appRoutes = appRoutes;
    this.currentUrl = '';
    this.window = this.document.defaultView as Window;
  }

  ngOnInit() {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.changeDetectorRef.detectChanges();
      }
    });

    this.authRepository.$user.pipe(takeUntil(this.destroy$)).subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        this.logout();
      }
    });
  }

  toggleSidebar() {
    this.eventBusService.emit({ type: EventBusType.TOGGLE_SIDEBAR });
  }

  closeSidebar() {
    this.eventBusService.emit({ type: EventBusType.CLOSE_SIDEBAR });
  }

  logout() {
    this.router.navigate([authRoutes.logout]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
