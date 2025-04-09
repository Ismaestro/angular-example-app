import type { Signal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NgProgressbar, NgProgressRef } from 'ngx-progressbar';
import type { RouterEvent } from '@angular/router';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationSkipped,
  NavigationStart,
  Router,
} from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

/** Delay before showing the progress bar */
export const PROGRESS_BAR_DELAY = 30;

@Component({
  selector: 'app-progress-bar',
  template: `<ng-progress aria-label="Page load progress" i18n-aria-label />`,
  imports: [NgProgressbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  private readonly router = inject(Router);
  private readonly progressBar: Signal<NgProgressRef | undefined> = viewChild(NgProgressRef);
  private readonly routerEvents = toSignal(
    this.router.events.pipe(filter((event) => this.isNavigationEvent(event as RouterEvent))),
  ) as Signal<RouterEvent>;
  private readonly timeoutId = signal<number | null>(null);

  constructor() {
    effect(() => {
      const event = this.routerEvents();

      if (event instanceof NavigationStart) {
        const id = setTimeout(() => {
          this.progressBar()?.start();
        }, PROGRESS_BAR_DELAY) as unknown as number;

        this.timeoutId.set(id);
      }

      if (this.isNavigationEndLike(event)) {
        const id = this.timeoutId();
        if (id !== null) {
          clearTimeout(id);
        }
        this.progressBar()?.complete();
        this.timeoutId.set(null);
      }
    });
  }

  private isNavigationEvent(event: RouterEvent): boolean {
    return event instanceof NavigationStart || this.isNavigationEndLike(event);
  }

  private isNavigationEndLike(event: RouterEvent): boolean {
    return (
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationSkipped ||
      event instanceof NavigationError
    );
  }
}
