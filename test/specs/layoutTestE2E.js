/* eslint-disable no-undef */
const HomePage = require('../pageobjects/homePage.js');

describe('Check elements in header', () => {
  beforeAll('open browser', () => {
    browser.setWindowSize(1209, 827);
    browser.url('https://joaco-megarocket-app.vercel.app/');
  });

  it('Check elements in second section', async () => {
    await HomePage.sectitonTwoTitle.scrollIntoView();
    await expect(HomePage.sectitonTwoTitle).toBeDisplayed();
    await expect(HomePage.sectitonTwoTitle).toHaveTextContaining('Features');

    await expect(HomePage.shiftReservations).toBeDisplayed();
  });
});
//footer.scrollIntoView()
