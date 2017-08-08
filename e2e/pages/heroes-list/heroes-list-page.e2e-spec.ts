import {HeroesListPage} from './heroes-list-page';

describe('Home page', function () {
  let page;
  const defaultHeroes = 9;

  beforeEach(() => {
    page = new HeroesListPage();
  });

  it('should contains equal or more heroes than default ones', () => {
    HeroesListPage.navigateTo();
    expect<any>(HeroesListPage.getNumberHeroes()).toBeGreaterThanOrEqual(defaultHeroes);
  });
});
