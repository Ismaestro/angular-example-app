import {AngularTOHPage} from './app.po';

describe('angular-hero-cli App', function () {
  let page: AngularTOHPage;

  beforeEach(() => {
    page = new AngularTOHPage();
  });

  it('Title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Tour of Heroes');
  });
});
