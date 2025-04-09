import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { DecorativeHeaderComponent } from '~core/components/decorative-header/decorative-header.component';
import { CardComponent } from '~core/components/card/card.component';
import { interval } from 'rxjs';
import { AnalyticsService } from '~core/services/analytics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DecorativeHeaderComponent, NgOptimizedImage, CardComponent],
})
export class HomeComponent {
  private readonly analyticsService = inject(AnalyticsService);
  readonly activeUsersResource = this.analyticsService.getRealtimeUsersResource();

  constructor() {
    this.activeUsersResource.reload();
    effect(() => {
      const sub = interval(5000).subscribe(() => {
        this.activeUsersResource.reload();
      });
      return () => {
        sub.unsubscribe();
      };
    });
  }
}
