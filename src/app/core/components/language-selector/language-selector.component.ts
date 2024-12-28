import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { LanguageService } from '~core/services/language.service';

import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import { AUTH_URLS } from '~core/constants/urls.constants';
import { translations } from '../../../../locale/translations';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UpperCasePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LanguageSelectorComponent implements OnInit {
  readonly router = inject(Router);
  readonly languageService = inject(LanguageService);

  localeIdText = '';

  ngOnInit() {
    this.localeIdText = this.languageService.convertLocaleToAcceptLanguage();
  }

  protected readonly AUTH_URLS = AUTH_URLS;
  protected readonly translations = translations;
}
