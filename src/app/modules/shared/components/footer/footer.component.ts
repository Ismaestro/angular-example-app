import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TickerComponent } from '~modules/shared/components/ticker/ticker.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TickerComponent],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
