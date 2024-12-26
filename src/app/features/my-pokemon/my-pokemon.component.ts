import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
} from '@angular/core';
import { UserService } from '~features/authentication/services/user.service';
import { PokemonCardComponent } from '~features/pokemon/components/pokemon-card/pokemon-card.component';
import type { User } from '~features/authentication/types/user.type';
import { PokemonService } from '~features/pokemon/services/pokemon.service';
import type { Pokemon } from '~features/pokemon/types/pokemon.type';
import { NgOptimizedImage } from '@angular/common';
import { PokemonSearchComponent } from '~features/pokemon/components/pokemon-search/pokemon-search.component';
import { translations } from '../../../locale/translations';
import { AlertService } from '~core/services/alert.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-my-pokemon',
  templateUrl: './my-pokemon.component.html',
  styleUrl: './my-pokemon.component.scss',
  imports: [PokemonCardComponent, NgOptimizedImage, PokemonSearchComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MyPokemonComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly pokemonService = inject(PokemonService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly alertService = inject(AlertService);
  private readonly destroyRef = inject(DestroyRef);

  readonly translations = translations;
  user: User | undefined;
  userPokemon: Pokemon[] | undefined;

  ngOnInit() {
    this.userService
      .getMe({ cache: false })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          this.user = user;
          if (this.user.caughtPokemonIds.length > 0) {
            this.pokemonService
              .getPokemons(this.user.caughtPokemonIds)
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe({
                next: (pokemons) => {
                  this.userPokemon = pokemons;
                  this.changeDetectorRef.markForCheck();
                },
                error: () => {
                  this.alertService.createErrorAlert(translations.genericErrorAlert);
                },
              });
          } else {
            this.userPokemon = [];
            this.changeDetectorRef.markForCheck();
          }
        },
      });
  }
}
