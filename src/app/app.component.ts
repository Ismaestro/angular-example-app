import {Component} from '@angular/core';
import {TranslateService}  from 'ng2-translate';
import {Title} from '@angular/platform-browser';

import {environment} from '../environments/environment';

@Component({
  selector: 'toh-app',
  templateUrl: './app.component.html'
})

export class AppComponent {
  private translateService: TranslateService;

  constructor(translateService: TranslateService,
              private titleService: Title) {
    titleService.setTitle(environment.title);

    this.translateService = translateService;
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }
}
