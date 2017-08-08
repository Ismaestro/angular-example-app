import {Component, Inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {APP_CONFIG} from '../../config/app.config';
import {IAppConfig} from '../../config/iapp.config';
import {ProgressBarService} from '../../shared/services/progress-bar.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent {
  appConfig: any;
  menuItems: any[];
  progressBarMode: string;

  private translateService: TranslateService;

  constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
              private progressBarService: ProgressBarService,
              translateService: TranslateService) {
    this.appConfig = appConfig;
    this.translateService = translateService;
    this.loadMenus();

    this.progressBarService.updateProgressBar$.subscribe((mode) => {
      this.progressBarMode = mode;
    });
  }

  changeLanguage(language: string): void {
    this.translateService.use(language).subscribe(() => {
      this.loadMenus();
    });
  }

  private loadMenus(): void {
    this.translateService.get(['home', 'heroesList'], {}).subscribe((texts: string) => {
      this.menuItems = [
        {link: '/', name: texts['home']},
        {link: '/' + this.appConfig.routes.heroesList, name: texts['heroesList']}
      ];
    });
  }
}
