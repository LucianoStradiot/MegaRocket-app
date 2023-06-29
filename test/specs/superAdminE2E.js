/* eslint-disable no-undef */
const Header = require('../pageobjects/headerTest.js');
const SuperAdmin = require('../pageobjects/superAdmin.js');

describe('Check elements in Home Page', () => {
  beforeAll('open browser', () => {
    browser.setWindowSize(1209, 827);
    browser.url('https://joaco-megarocket-app.vercel.app/superAdmins');
  });

  it('Check elements in header', async () => {
    await expect(Header.title).toBeDisplayed();
    await expect(Header.logo).toBeDisplayed();
    expect(Header.containerHeader.getCSSProperty('align-items').value).toBe('center');
    expect(Header.containerHeader.getCSSProperty('justify-content').value).toBe('space-between');

    await expect(Header.title).toHaveText('Super Admins');
    await expect(Header.logo).toHaveAttribute('src', '/assets/images/logo-header.png');
  });
});
