import { browser, by, element } from 'protractor';
import { RoutesConfig } from '../../../../../src/app/configs/routes.config';

export class HeroesListPage {
  static navigateTo(): any {
    return browser.get(RoutesConfig.routesNames.heroes.basePath);
  }

  static getNumberHeroes(): any {
    return element.all(by.css('#left mat-list-item')).count();
  }
}
