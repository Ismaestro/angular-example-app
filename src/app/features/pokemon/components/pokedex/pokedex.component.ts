import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  input,
} from '@angular/core';
import type { Pokemon } from '~features/pokemon/types/pokemon.type';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PokedexComponent implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  pokemon = input<Pokemon>();
  isPokedexClosed = true;

  ngOnInit() {
    setTimeout(() => {
      this.isPokedexClosed = false;
      this.changeDetectorRef.markForCheck();
    }, 300);
  }

  togglePokedex() {
    this.isPokedexClosed = !this.isPokedexClosed;
  }
}
