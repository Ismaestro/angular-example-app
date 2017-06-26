import {browser, by, element} from 'protractor';

export class AngularTOHPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('toh-hero-top h3')).getText();
  }
}
