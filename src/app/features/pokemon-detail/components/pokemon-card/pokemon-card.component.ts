import { ChangeDetectionStrategy, Component, model } from '@angular/core';

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
  counter = model<number>(0);

  increaseCounter() {
    this.counter.set(this.counter() + 1);
  }
}
