/* eslint-disable no-undef */
const HomePage = require('../pageobjects/homePage.js');

describe('Check elements in header', () => {
  beforeAll('open browser', () => {
    browser.setWindowSize(1209, 827);
    browser.url('https://joaco-megarocket-app.vercel.app/');
  });

  it('Check Time Navigation from Login to Main Page', async () => {
    await expect(HomePage.headerTitle).toBeDisplayed();
  });
});
