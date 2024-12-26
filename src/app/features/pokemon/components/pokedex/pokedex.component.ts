import type { OnInit, WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  effect,
  inject,
  input,
} from '@angular/core';
import type { Pokemon } from '~features/pokemon/types/pokemon.type';
import { PokemonImageComponent } from '~features/pokemon/components/pokemon-image/pokemon-image.component';
import { FirstTitleCasePipe } from '~core/pipes/first-title-case.pipe';
import { UserService } from '~features/authentication/services/user.service';
import type { User } from '~features/authentication/types/user.type';
import { BattleEvent } from '~features/pokemon/components/pokedex/enums/pokedex-action.enum';
import { AlertService } from '~core/services/alert.service';
import { translations } from '../../../../../locale/translations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss', './pokedex-pads.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [PokemonImageComponent, FirstTitleCasePipe],
})
export class PokedexComponent implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly userService = inject(UserService);
  private readonly alertService = inject(AlertService);
  private readonly destroyRef = inject(DestroyRef);

  readonly pokemonBattleEvent = input.required<WritableSignal<BattleEvent>>();
  readonly pokemon = input<Pokemon>();

  translations = translations;
  user: User | undefined;
  updatedUser: User | undefined;
  userHasCaught = false;
  userHasPokemon = true;
  isPokedexClosed = true;
  isPokedexButtonDisabled = false;
  pokemonImage: string | undefined;

  constructor() {
    effect(() => {
      this.updatePokemonState();
      this.handleBattleEvents();
    });
  }

  ngOnInit() {
    const pokemonValue = this.pokemon();
    if (pokemonValue) {
      this.userService
        .getMe()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (user: User) => {
            this.user = user;
            this.pokemonImage = pokemonValue.sprites.front_default;
            this.userHasPokemon = user.caughtPokemonIds.includes(pokemonValue.id);
            setTimeout(() => {
              this.isPokedexClosed = false;
              this.changeDetectorRef.markForCheck();
            }, 300);
          },
          error: () => {
            this.alertService.createErrorAlert(translations.genericErrorAlert);
          },
        });
    }
  }

  togglePokedex() {
    this.isPokedexClosed = !this.isPokedexClosed;
  }

  notifyBattlefield() {
    this.isPokedexButtonDisabled = true;
    (this.pokemonBattleEvent() as unknown as WritableSignal<BattleEvent>).set(
      BattleEvent.THROW_POKEBALL,
    );
  }

  catchPokemon() {
    this.userHasCaught = false;
    const pokemonId = this.pokemon()?.id;
    if (pokemonId) {
      this.userService
        .catchPokemon({ pokemonId })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (user) => {
            this.notifyBattlefield();
            this.updatedUser = user;
          },
        });
    }
  }

  private updatePokemonState(): void {
    const pokemonValue = this.pokemon();
    if (pokemonValue) {
      this.pokemonImage = pokemonValue.sprites.front_default;
      this.userHasPokemon = this.user?.caughtPokemonIds.includes(pokemonValue.id) ?? false;
      this.changeDetectorRef.markForCheck();
    }
  }

  private handleBattleEvents(): void {
    const event = this.pokemonBattleEvent()();
    switch (event as unknown as BattleEvent) {
      case BattleEvent.CATCH_ANIMATION_ENDED: {
        this.handleCatchAnimationEnded();
        break;
      }
      case BattleEvent.RESET_BATTLE: {
        this.handleResetBattle();
        break;
      }
      default: {
        break;
      }
    }
  }

  private handleCatchAnimationEnded(): void {
    if (this.updatedUser) {
      this.user = this.updatedUser;
      this.userHasCaught = true;
      this.changeDetectorRef.markForCheck();
    }
  }

  private handleResetBattle(): void {
    this.userHasCaught = false;
    this.isPokedexButtonDisabled = false;
    const pokemonValue = this.pokemon();
    const pokemonId = pokemonValue?.id;
    const caughtPokemonIds = this.user?.caughtPokemonIds ?? [];
    this.userHasPokemon = pokemonId ? caughtPokemonIds.includes(pokemonId) : true;
    this.changeDetectorRef.markForCheck();
  }
}
