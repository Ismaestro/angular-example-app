import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { translations } from '../../../../../locale/translations';
import { UserService } from '~features/authentication/services/user.service';
import { Language } from '~core/enums/language.enum';
import { SlInputIconFocusDirective } from '~core/directives/sl-input-icon-focus.directive';
import type { User } from '~features/authentication/types/user.type';
import { PokemonService } from '~features/pokemon/services/pokemon.service';
import type { Pokemon } from '~features/pokemon/types/pokemon.type';
import { PokemonImageComponent } from '~features/pokemon/components/pokemon-image/pokemon-image.component';
import { AppSlSelectControlDirective } from '~core/directives/sl-select-control.directive';
import { ThemeButtonComponent } from '~core/components/theme-button/theme-button.component';
import { NgOptimizedImage } from '@angular/common';
import { AlertStore } from '~core/services/ui/alert.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LanguageService } from '~core/services/language.service';
import { AUTH_URLS } from '~core/constants/urls.constants';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import { TrimDirective } from '~core/directives/trim.directive';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    SlInputIconFocusDirective,
    PokemonImageComponent,
    AppSlSelectControlDirective,
    ThemeButtonComponent,
    NgOptimizedImage,
    TrimDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MyAccountComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly pokemonService = inject(PokemonService);
  private readonly alertStore = inject(AlertStore);
  private readonly destroyRef = inject(DestroyRef);
  private readonly languageService = inject(LanguageService);

  readonly isButtonUpdateUserFormLoading = signal(false);
  readonly pokemonImage = signal('');

  translations = translations;
  user: User | undefined;
  userFavouritePokemon: Pokemon | undefined;
  name = new FormControl('', [Validators.required, Validators.minLength(2)]);
  email = new FormControl('');
  language = new FormControl<Language>(Language.EN_US, [Validators.required]);
  updateUserForm = this.formBuilder.group({
    name: this.name,
    language: this.language,
    email: this.email,
  });

  ngOnInit() {
    this.email.disable();
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.userService
      .getMe()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user: User) => {
          this.user = user;
          this.name.setValue(this.user.name);
          this.email.setValue(this.user.email);
          this.language.setValue(this.user.language);
          this.loadPokemonImage();
        },
        error: () => {
          this.alertStore.createErrorAlert(translations.genericErrorAlert);
        },
      });
  }

  loadPokemonImage() {
    this.pokemonService
      .getPokemon(this.user!.favouritePokemonId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (pokemon) => {
          this.userFavouritePokemon = pokemon;
          this.pokemonImage.set(this.userFavouritePokemon.sprites.front_default);
        },
        error: () => {
          this.alertStore.createErrorAlert(translations.genericErrorAlert);
        },
      });
  }

  sendForm() {
    this.updateUserForm.markAllAsTouched();
    if (this.updateUserForm.valid) {
      this.isButtonUpdateUserFormLoading.set(true);
      this.updateUser();
    }
  }

  updateUser() {
    const formValue = this.updateUserForm.getRawValue();
    this.userService
      .updateUser({
        name: formValue.name!,
        language: formValue.language!,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.alertStore.createSuccessAlert(translations.myAccountSuccessAlert);
          this.languageService.navigateWithUserLanguage(formValue.language!, AUTH_URLS.myAccount);
          this.isButtonUpdateUserFormLoading.set(false);
        },
        error: () => {
          this.isButtonUpdateUserFormLoading.set(false);
          this.alertStore.createErrorAlert(translations.genericErrorAlert);
        },
      });
  }
}
