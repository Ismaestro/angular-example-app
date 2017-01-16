import {Component} from '@angular/core';
import {TranslateService}  from 'ng2-translate';

@Component({
  selector: 'toh-app',
  templateUrl: './app.component.html'
})

export class AppComponent {
  private translateService: TranslateService;

  constructor(translateService: TranslateService) {
    this.translateService = translateService;
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }
}
