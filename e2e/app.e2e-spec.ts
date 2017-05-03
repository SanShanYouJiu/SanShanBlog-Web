import { SanShanBlogWebPage } from './app.po';

describe('san-shan-blog-web App', function() {
  let page: SanShanBlogWebPage;

  beforeEach(() => {
    page = new SanShanBlogWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
