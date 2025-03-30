import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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

  readonly activeUsers = signal(1);

  ngOnInit(): void {
    this.fetchRealtimeUsers();
    setInterval(() => {
      this.fetchRealtimeUsers();
    }, 5000);
  }

  fetchRealtimeUsers(): void {
    this.googleAnalyticsService.getRealtimeUsers().subscribe({
      next: (data) => {
        this.activeUsers.set(Math.max(data.activeUsers || 0, 1));
      },
    });
  }
}
