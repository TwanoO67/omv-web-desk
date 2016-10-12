import { Ng2OsNewPage } from './app.po';

describe('ng2-os-new App', function() {
  let page: Ng2OsNewPage;

  beforeEach(() => {
    page = new Ng2OsNewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
