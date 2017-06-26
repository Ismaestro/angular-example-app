import {Component, Inject, Input} from '@angular/core';
import {TranslateService} from 'ng2-translate';

import {APP_CONFIG} from '../../config/app.config';
import {IAppConfig} from '../../config/iapp.config';

@Component({
  selector: 'toh-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent {
  @Input() title: string;

  menuItems: any[];
  language: string;

  private translateService: TranslateService;

  private loadMenus(): void {
    this.translateService.get(['home', 'heroesList'], {}).subscribe((texts: string) => {
      this.menuItems = [
        {link: '/', name: texts['home']},
        {link: '/' + this.appConfig.routes.heroes, name: texts['heroesList']}
      ];
    });

    this.loadLanguageLabel();
  }

  private loadLanguageLabel() {
    switch (this.translateService.currentLang) {
      case 'en':
        this.language = 'english';
        break;
      case 'es':
        this.language = 'spanish';
        break;
      default:
        this.language = 'language';
    }
  }

  constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig,
              translateService: TranslateService) {
    this.translateService = translateService;
    this.loadMenus();
  }

  changeLanguage(language: string): void {
    this.translateService.use(language).subscribe(() => {
      this.loadMenus();
    });
  }
}
