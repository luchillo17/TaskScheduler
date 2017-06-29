import { browser, by, element } from 'protractor';

describe('App', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/#/home');
  });

  it('should have a title', (done) => {
    const subject = browser.getTitle()
      .then((title) => {
        const result  = 'Angular2 Webpack Starter by @gdi2290 from @AngularClass';
        expect(title).toEqual(result);
        done();
      });
  });

  it('should have `your content here` x-large', () => {
    const subject = element(by.css('[x-large]')).getText()
      .then((text) => {
        const result  = 'Your Content Here';
        expect(text).toEqual(result);
      });
  });

});
