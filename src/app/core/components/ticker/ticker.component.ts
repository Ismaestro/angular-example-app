import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-ticker',
  template: ` <!-- eslint-disable @angular-eslint/template/no-call-expression -->
    <ng-container i18n>seconds after app started: {{ counter() }}</ng-container>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TickerComponent {
  private readonly counterObservable = interval(1000);

  counter = toSignal(this.counterObservable, { initialValue: 0 });
}
