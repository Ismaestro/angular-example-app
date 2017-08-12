import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Meta, Title} from '@angular/platform-browser';

import {NavigationEnd, Router} from '@angular/router';
import {AppConfig} from './config/app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  constructor(private translateService: TranslateService,
              private title: Title,
              private meta: Meta,
              private router: Router) {

    this.translateService = translateService;
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        switch (event.urlAfterRedirects) {
          case '/':
            this.title.setTitle('Angular Example App');
            this.meta.updateTag({
              name: 'description',
              content: 'Angular 4 Example app with Angular CLI, Angular Material and more'
            });
            break;
          case '/' + AppConfig.routes.heroes:
            this.title.setTitle('Heroes list');
            this.meta.updateTag({
              name: 'description',
              content: 'List of super-heroes'
            });
            break;
        }
      }
    });
  }
}
