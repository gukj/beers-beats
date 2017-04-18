import { BeersBeatsDeployPage } from './app.po';

describe('beers-beats-deploy App', function() {
  let page: BeersBeatsDeployPage;

  beforeEach(() => {
    page = new BeersBeatsDeployPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
