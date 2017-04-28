import { WebdeskPage } from './app.po';

describe('webdesk App', () => {
  let page: WebdeskPage;

  beforeEach(() => {
    page = new WebdeskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
