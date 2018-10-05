import {Component, Inject, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import {APP_CONFIG, AppConfig} from '../../../configs/app.config';
import {ProgressBarService} from '../../../core/services/progress-bar.service';
import {LocalStorage} from 'ngx-store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  @LocalStorage() language = 'en';

  appConfig: any;
  menuItems: any[];
  progressBarMode: string;
  currentLang: string;

  constructor(@Inject(APP_CONFIG) appConfig: any,
              private progressBarService: ProgressBarService,
              private translateService: TranslateService) {
    this.appConfig = appConfig;
  }

  ngOnInit() {
    this.currentLang = this.translateService.currentLang;
    this.loadMenus();
    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });
  }

  changeLanguage(language: string): void {
    this.translateService.use(language).subscribe(() => {
      this.loadMenus();
      this.language = language;
    });
  }

  private loadMenus(): void {
    this.menuItems = [
      {link: '/', name: _('home')},
      {link: '/' + AppConfig.routes.heroes, name: _('heroesList')}
    ];
  }
}
