import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-ticker',
  template: ` <!-- eslint-disable @angular-eslint/template/no-call-expression -->
    seconds after app started: {{ counter() }}`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TickerComponent {
  counterObservable = interval(1000);
  counter = toSignal(this.counterObservable, { initialValue: 0 });
}
