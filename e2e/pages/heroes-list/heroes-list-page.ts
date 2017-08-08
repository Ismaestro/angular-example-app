import {browser, by, element} from 'protractor';
import {AppConfig} from '../../../src/app/config/app.config';

export class HeroesListPage {
  static navigateTo() {
    return browser.get(AppConfig.routes.heroesList);
  }

  static getNumberHeroes() {
    return element.all(by.css('#left md-list-item')).count();
  }
}
