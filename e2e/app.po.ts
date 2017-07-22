import {browser, by, element} from 'protractor';

export class AngularTOHPage {
  navigateTo() {
    return browser.get('/');
  }

  getNumberHeroes() {
    return element.all(by.css('toh-hero-top #heroes-list md-card')).count();
  }
}
