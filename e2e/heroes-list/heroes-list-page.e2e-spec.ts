import {HeroesListPage} from './heroes-list-page';

describe('Home page', function () {
  let page;

  beforeEach(() => {
    page = new HeroesListPage();
  });

  it('should contains equal or more heroes than default ones', () => {
    HeroesListPage.navigateTo();
    expect<any>(HeroesListPage.getNumberHeroes()).toBeGreaterThanOrEqual(8);
  });
});
