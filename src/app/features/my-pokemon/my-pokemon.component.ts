import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
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

@Component({
  selector: 'app-my-pokemon',
  templateUrl: './my-pokemon.component.html',
  styleUrl: './my-pokemon.component.scss',
  imports: [PokemonCardComponent, NgOptimizedImage, PokemonSearchComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MyPokemonComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly pokemonService = inject(PokemonService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly alertService = inject(AlertService);

  readonly translations = translations;
  user: User | undefined;
  userPokemon: Pokemon[] | undefined;

  ngOnInit() {
    this.userService.getMe().subscribe({
      next: (user) => {
        this.user = user;

        if (this.user.caughtPokemonIds) {
          this.pokemonService.getPokemons(this.user.caughtPokemonIds).subscribe({
            next: (pokemons) => {
              this.userPokemon = pokemons;
              this.changeDetectorRef.markForCheck();
            },
            error: () => {
              this.alertService.createErrorAlert(translations.genericErrorAlert);
            },
          });
        }
      },
    });
  }
}
