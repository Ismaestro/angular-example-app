import {AngularTOHPage} from './app.po';
import {AppConfig} from '../src/app/config/app.config';

describe('Angular Example App', function () {
  let page: AngularTOHPage;

  beforeEach(() => {
    page = new AngularTOHPage();
  });

  it('Number of heroes', () => {
    page.navigateTo();
    expect(page.getNumberHeroes()).toBe(AppConfig.topHeroesLimit);
  });
});
