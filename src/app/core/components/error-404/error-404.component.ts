import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error-404',
  templateUrl: './error-404.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class Error404Component {}
