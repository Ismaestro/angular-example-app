import type { OnInit, WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  Input,
  input,
} from '@angular/core';
import type { Pokemon } from '~features/pokemon/types/pokemon.type';
import { PokemonImageComponent } from '~features/pokemon/components/pokemon-image/pokemon-image.component';
import { FirstTitleCasePipe } from '~core/pipes/first-title-case.pipe';
import { UserService } from '~features/authentication/services/user.service';
import type { User } from '~features/authentication/types/user.type';
import { PokedexAction } from '~features/pokemon/components/pokedex/enums/pokedex-action.enum';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [PokemonImageComponent, FirstTitleCasePipe],
})
export class PokedexComponent implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly userService = inject(UserService);

  @Input() pokedexAction!: WritableSignal<PokedexAction>;
  pokemon = input<Pokemon>();
  isPokedexClosed = true;
  isPokedexButtonDisabled = false;
  userHasPokemon = true;
  pokemonImage: string | undefined;

  constructor() {
    effect(() => {
      const pokemonValue = this.pokemon();
      if (pokemonValue) {
        this.pokemonImage = pokemonValue.sprites.front_default;
        this.changeDetectorRef.markForCheck();
      }

      if (this.pokedexAction() === PokedexAction.CATCH_ANIMATION_ENDED) {
        // Console.log('time to tell the user its been trapped!');
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  ngOnInit() {
    const pokemonValue = this.pokemon();
    if (pokemonValue) {
      this.userService.getMe().subscribe({
        next: (user: User) => {
          this.pokemonImage = pokemonValue.sprites.front_default;
          this.userHasPokemon = user.pokemonIdsCaught?.includes(pokemonValue.id) ?? false;
          setTimeout(() => {
            this.isPokedexClosed = false;
            this.changeDetectorRef.markForCheck();
          }, 300);
        },
        error: () => {
          // TODO: show alert
        },
      });
    }
  }

  togglePokedex() {
    this.isPokedexClosed = !this.isPokedexClosed;
  }

  notifyBattlefield() {
    this.isPokedexButtonDisabled = true;
    this.pokedexAction.set(PokedexAction.THROW_POKEBALL);
  }
}
