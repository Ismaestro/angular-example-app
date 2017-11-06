import {browser, by, element} from 'protractor';
import {AppConfig} from '../../src/app/config/app.config';

export class HeroesListPage {
  static navigateTo(): any {
    return browser.get(AppConfig.routes.heroes);
  }

  static getNumberHeroes(): any {
    return element.all(by.css('#left mat-list-item')).count();
  }
}
