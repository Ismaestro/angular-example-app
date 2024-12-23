import { inject, Injectable, LOCALE_ID } from '@angular/core';
import { Language } from '~core/enums/language.enum';
import { Locale } from '~core/enums/locale.enum';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly localeId = inject(LOCALE_ID);

  convertLocaleToAcceptLanguage(): Language {
    if (this.localeId === (Locale.ES as string)) {
      return Language.ES_ES;
    }
    return Language.EN_US;
  }
}
