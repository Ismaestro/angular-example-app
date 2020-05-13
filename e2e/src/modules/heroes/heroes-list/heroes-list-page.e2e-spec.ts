import { HeroesListPage } from './heroes-list-page';
import { browser } from 'protractor';

describe('Heroes list page', () => {
  let page;

  beforeEach(() => {
    page = new HeroesListPage();
  });

  it('should contains equal or more heroes than default ones', () => {
    HeroesListPage.navigateTo();
    browser.driver.sleep(2000);
    expect<any>(HeroesListPage.getNumberHeroes()).toBeGreaterThanOrEqual(8);
  });
});
