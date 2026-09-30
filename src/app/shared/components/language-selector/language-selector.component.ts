import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { LanguageService } from '~core/services/language.service';
import { injectCurrentUrl } from '~core/router/current-url';
import { Locale } from '~core/enums/locale.enums';
import { translations } from '~locale/translations';

import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';

@Component({
  selector: 'app-language-selector',
  imports: [UpperCasePipe],
  templateUrl: './language-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LanguageSelectorComponent {
  private readonly languageService = inject(LanguageService);

  readonly translations = translations;
  readonly localeIdText = this.languageService.convertLocaleToAcceptLanguage();
  readonly englishUrl = injectCurrentUrl();
  readonly spanishUrl = computed(() => `/${Locale.ES}${this.englishUrl()}`);
}
