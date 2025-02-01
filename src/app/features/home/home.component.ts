import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { DecorativeHeaderComponent } from '~core/components/decorative-header/decorative-header.component';
import { CardComponent } from '~core/components/card/card.component';
import { GoogleAnalyticsService } from '~features/home/services/google-analitycs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecorativeHeaderComponent, NgOptimizedImage, CardComponent],
})
export class HomeComponent implements OnInit {
  private readonly googleAnalyticsService = inject(GoogleAnalyticsService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  activeUsers = 1;

  ngOnInit(): void {
    this.fetchRealtimeUsers();
    setInterval(() => {
      this.fetchRealtimeUsers();
    }, 5000);
  }

  fetchRealtimeUsers(): void {
    this.googleAnalyticsService.getRealtimeUsers().subscribe({
      next: (data) => {
        this.activeUsers = Math.max(data.activeUsers || 0, 1);
        this.changeDetectorRef.markForCheck();
      },
    });
  }
}
