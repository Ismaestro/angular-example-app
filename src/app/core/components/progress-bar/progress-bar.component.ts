import type { OnInit, Signal } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { NgProgressbar, NgProgressRef } from 'ngx-progressbar';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationSkipped,
  NavigationStart,
  Router,
} from '@angular/router';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/** Time to wait after navigation starts before showing the progress bar.
 * This delay allows a small amount of time to skip showing the progress bar
 * when a navigation is effectively immediate.
 * 30ms is approximately the amount of time we can wait before a delay is perceptible.
 * */
export const PROGRESS_BAR_DELAY = 30;

@Component({
  selector: 'app-progress-bar',
  template: `
    <ng-progress aria-label="Page load progress" i18n-aria-label />
  `,
  imports: [NgProgressbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly progressBar: Signal<NgProgressRef | undefined> = viewChild(NgProgressRef);

  ngOnInit() {
    this.setupPageNavigationDimming();
  }

  private setupPageNavigationDimming() {
    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((event) => event instanceof NavigationStart),
        map(() => this.startProgressBarWithDelay()),
        switchMap((timeoutId) => this.waitForNavigationEnd(timeoutId)),
      )
      .subscribe((timeoutId) => {
        this.clearNavigationTimeout(timeoutId);
      });
  }

  private startProgressBarWithDelay(): number {
    return setTimeout(() => {
      this.progressBar()?.start();
    }, PROGRESS_BAR_DELAY) as unknown as number;
  }

  private waitForNavigationEnd(timeoutId: number) {
    return this.router.events.pipe(
      filter(
        (event) =>
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationSkipped ||
          event instanceof NavigationError,
      ),
      take(1),
      map(() => timeoutId),
    );
  }

  private clearNavigationTimeout(timeoutId: number) {
    clearTimeout(timeoutId);
    this.progressBar()?.complete();
  }
}
