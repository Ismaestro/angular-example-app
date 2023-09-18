import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EventBusService, EventBusType } from '~modules/shared/services/event-bus.service';
import { NgIf } from '@angular/common';
import { userRoutes } from '~modules/user/shared/user-routes';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { User } from '~modules/user/shared/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, NgIf],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input({ required: true }) user: User | undefined;

  userRoutes: typeof userRoutes;
  currentUrl: string;
  showEmptySpace: boolean;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  // eslint-disable-next-line max-params
  constructor(
    private eventBusService: EventBusService,
    public router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private document: Document,
  ) {
    this.showEmptySpace = false;
    this.currentUrl = '';
    this.userRoutes = userRoutes;
  }

  ngOnInit() {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.changeDetectorRef.detectChanges();
      }
    });

    this.eventBusService.events$.pipe(takeUntil(this.destroy$)).subscribe(event => {
      if (event.type === EventBusType.TOGGLE_SIDEBAR) {
        this.showEmptySpace = !this.showEmptySpace;
      } else if (event.type === EventBusType.CLOSE_SIDEBAR) {
        this.showEmptySpace = false;
        this.closeSidebar();
      }
      this.changeDetectorRef.detectChanges();
    });
  }

  closeSidebar() {
    const sidebar = this.document.getElementById('sidebar');
    sidebar?.classList.remove('show');
    this.showEmptySpace = false;
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
