import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { translations } from '~locale/translations';
import { UserStore } from '~features/authentication/services/user.store';
import { Language } from '~core/enums/language.enums';
import { SlInputIconFocusDirective } from '~shared/directives/sl-input-icon-focus.directive';
import { PokemonService } from '~features/pokemon/services/pokemon.service';
import { PokemonImageComponent } from '~features/pokemon/components/pokemon-image/pokemon-image.component';
import { AppSlSelectControlDirective } from '~shared/directives/sl-select-control.directive';
import { ThemeButtonComponent } from '~shared/components/theme-button/theme-button.component';
import { NgOptimizedImage } from '@angular/common';
import { AlertService } from '~core/services/ui/alert.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LanguageService } from '~core/services/language.service';
import { AUTH_URLS } from '~core/constants/urls.constants';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import { TrimDirective } from '~shared/directives/trim.directive';

@Component({
  selector: 'app-my-account',
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
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MyAccountComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly userStore = inject(UserStore);
  private readonly pokemonService = inject(PokemonService);
  private readonly alertService = inject(AlertService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly languageService = inject(LanguageService);

  readonly user = this.userStore.user;
  readonly favouritePokemon = this.pokemonService.getPokemonResource(() =>
    this.user.hasValue() ? String(this.user.value().favouritePokemonId) : undefined,
  );
  readonly pokemonImage = computed(() =>
    this.favouritePokemon.hasValue() ? this.favouritePokemon.value().sprites.front_default : '',
  );
  readonly isButtonUpdateUserFormLoading = signal(false);

  readonly translations = translations;
  readonly updateUserForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: [{ value: '', disabled: true }],
    language: this.formBuilder.control<Language>(Language.EN_US, Validators.required),
  });

  /** Reactive forms are not signal-based: syncing the user into the form is a legit effect */
  readonly userFormEffect = effect(() => {
    if (this.user.hasValue()) {
      const { name, email, language } = this.user.value();
      this.updateUserForm.setValue({ name, email, language });
    }
  });

  sendForm() {
    this.updateUserForm.markAllAsTouched();
    if (this.updateUserForm.valid) {
      this.isButtonUpdateUserFormLoading.set(true);
      this.updateUser();
    }
  }

  updateUser() {
    const { name, language } = this.updateUserForm.getRawValue();
    this.userStore
      .updateUser({ name, language })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.alertService.createSuccessAlert(translations.myAccountSuccessAlert);
          this.languageService.navigateWithUserLanguage(language, AUTH_URLS.myAccount);
          this.isButtonUpdateUserFormLoading.set(false);
        },
        error: () => {
          this.isButtonUpdateUserFormLoading.set(false);
          this.alertService.createErrorAlert(translations.genericErrorAlert);
        },
      });
  }
}
