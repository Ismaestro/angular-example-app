import { inject, Injectable, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from '~core/enums/language.enum';
import { Locale } from '~core/enums/locale.enum';
import { DEFAULT_LOCALE } from '~core/constants/language.constants';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly localeId = inject(LOCALE_ID);
  private readonly router = inject(Router);

  convertLocaleToAcceptLanguage(): Language {
    if (this.localeId === (Locale.ES as string)) {
      return Language.ES_ES;
    }
    return Language.EN_US;
  }

  navigateWithUserLanguage(language: Language, pathToRedirect: string) {
    if (this.doesLocaleMatchLanguage(language)) {
      void this.router.navigate([pathToRedirect]);
    } else {
      const localeToRedirect = this.getLocaleFromLanguage(language);
      window.location.href =
        localeToRedirect === DEFAULT_LOCALE
          ? pathToRedirect
          : `/${localeToRedirect}${pathToRedirect}`;
    }
  }

  private doesLocaleMatchLanguage(language: Language) {
    if (this.localeId === (Locale.ES as string)) {
      return language === Language.ES_ES;
    }
    return language === Language.EN_US;
  }

  private getLocaleFromLanguage(language: Language): Locale {
    if (language === Language.ES_ES) {
      return Locale.ES;
    }
    return DEFAULT_LOCALE;
  }
}
