import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '~environments/environment';
import { appRoutes } from '../../../../app-routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
})
export class FooterComponent {
  environment: typeof environment;
  appRoutes: typeof appRoutes;
  currentYear: number;

  constructor() {
    this.environment = environment;
    this.appRoutes = appRoutes;
    this.currentYear = new Date().getFullYear();
  }
}
