import { ChangeDetectionStrategy, Component, model } from '@angular/core';

const COUNTER_INCREMENT_SIZE = 1,
  COUNTER_STARTS = 0;

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-clicked]': 'counter() > 0',
    '(click)': 'increaseCounter()',
  },
})
export class PokemonCardComponent {
  counter = model<number>(COUNTER_STARTS);

  increaseCounter() {
    this.counter.set(this.counter() + COUNTER_INCREMENT_SIZE);
  }
}
