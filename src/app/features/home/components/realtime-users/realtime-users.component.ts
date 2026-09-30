import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AnalyticsService } from '~core/services/analytics.service';

@Component({
  selector: 'app-realtime-users',
  templateUrl: './realtime-users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RealtimeUsersComponent {
  readonly realtimeUsers = inject(AnalyticsService).getRealtimeUsersResource();
}
