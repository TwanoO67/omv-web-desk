import { Ng2OsPage } from './app.po';

describe('ng2-os App', function() {
  let page: Ng2OsPage;

  beforeEach(() => {
    page = new Ng2OsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
