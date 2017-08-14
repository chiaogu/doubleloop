import { DoubleLoopPage } from './app.po';

describe('double-loop App', () => {
  let page: DoubleLoopPage;

  beforeEach(() => {
    page = new DoubleLoopPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
