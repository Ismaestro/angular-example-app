import {browser, by, element} from 'protractor';

export class HomePage {
  static navigateTo() {
    return browser.get('/');
  }

  static getNumberHeroes() {
    return element.all(by.css('#heroes-list md-card')).count();
  }
}
