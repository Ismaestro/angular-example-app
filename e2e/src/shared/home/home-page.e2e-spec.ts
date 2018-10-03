import {HomePage} from './home-page';
import {AppConfig} from '../../../../src/app/configs/app.config';

describe('Home page', function () {
  let page;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should contains heroes limit', () => {
    HomePage.navigateTo();
    expect<any>(HomePage.getNumberHeroes()).toBe(AppConfig.topHeroesLimit);
  });
});
