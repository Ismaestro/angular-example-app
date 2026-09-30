import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { DecorativeHeaderComponent } from '~shared/components/decorative-header/decorative-header.component';
import { CardComponent } from '~shared/components/card/card.component';
import { RealtimeUsersComponent } from '~features/home/components/realtime-users/realtime-users.component';

@Component({
  selector: 'app-home',
  imports: [DecorativeHeaderComponent, NgOptimizedImage, CardComponent, RealtimeUsersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
