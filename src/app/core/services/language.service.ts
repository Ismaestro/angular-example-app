import { inject, Injectable, LOCALE_ID } from '@angular/core';
import { DEFAULT_LANGUAGE } from '~core/constants/language.constants';
import { Router } from '@angular/router';
import { Language } from '~core/enums/language.enum';
import { Locale } from '~core/enums/locale.enum';

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

  navigateWithUserLanguage(userLanguage: string, path: string) {
    const localeToRedirect = this.getLocaleFromUserLanguage(userLanguage);
    if (userLanguage === this.localeId || userLanguage === (DEFAULT_LANGUAGE as string)) {
      void this.router.navigate([path]);
    } else {
      window.location.href = `/${localeToRedirect}${path}`;
    }
  }

  private getLocaleFromUserLanguage(userLanguage: string) {
    if (userLanguage === (Language.ES_ES as string)) {
      return Locale.ES;
    }
    return Locale.EN;
  }
}
