import { browser, by, element } from 'protractor';

export class HomePage {
  static navigateTo(): any {
    return browser.get('/');
  }

  static getNumberHeroes(): any {
    return element.all(by.css('#heroes-list mat-card')).count();
  }
}
