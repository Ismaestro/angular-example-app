import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  linkedSignal,
} from '@angular/core';
import { disabled, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
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
import { firstValueFrom } from 'rxjs';
import { LanguageService } from '~core/services/language.service';
import { AUTH_URLS } from '~core/constants/urls.constants';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import { AppSlInputControlDirective } from '~shared/directives/sl-input-control.directive';

type UpdateUserFormModel = {
  name: string;
  email: string;
  language: Language;
};

@Component({
  selector: 'app-my-account',
  imports: [
    RouterModule,
    FormField,
    FormRoot,
    SlInputIconFocusDirective,
    AppSlInputControlDirective,
    PokemonImageComponent,
    AppSlSelectControlDirective,
    ThemeButtonComponent,
    NgOptimizedImage,
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MyAccountComponent {
  private readonly userStore = inject(UserStore);
  private readonly pokemonService = inject(PokemonService);
  private readonly alertService = inject(AlertService);
  private readonly languageService = inject(LanguageService);

  readonly user = this.userStore.user;
  readonly favouritePokemon = this.pokemonService.getPokemonResource(() =>
    this.user.hasValue() ? String(this.user.value().favouritePokemonId) : undefined,
  );
  readonly pokemonImage = computed(() =>
    this.favouritePokemon.hasValue() ? this.favouritePokemon.value().sprites.front_default : '',
  );

  readonly translations = translations;

  // Writable and derived from the user: it is reset every time the user changes (e.g. after saving)
  private readonly updateUserModel = linkedSignal<UpdateUserFormModel>(() =>
    this.user.hasValue()
      ? {
          name: this.user.value().name,
          email: this.user.value().email,
          language: this.user.value().language,
        }
      : { name: '', email: '', language: Language.EN_US },
  );
  readonly updateUserForm = form(
    this.updateUserModel,
    (path) => {
      required(path.name);
      minLength(path.name, 2);
      disabled(path.email);
      required(path.language);
    },
    { submission: { action: async () => this.updateUser() } },
  );
  readonly isButtonUpdateUserFormLoading = this.updateUserForm().submitting;

  private async updateUser(): Promise<void> {
    const { name, language } = this.updateUserModel();
    try {
      await firstValueFrom(this.userStore.updateUser({ name, language }));
    } catch {
      this.alertService.createErrorAlert(translations.genericErrorAlert);
      return;
    }
    this.alertService.createSuccessAlert(translations.myAccountSuccessAlert);
    this.languageService.navigateWithUserLanguage(language, AUTH_URLS.myAccount);
  }
}
