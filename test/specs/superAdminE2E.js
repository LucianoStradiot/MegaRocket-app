/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const Header = require('../pageobjects/headerTest.js');
const HomePage = require('../pageobjects/homePage.js');
const Login = require('../pageobjects/loginTest.js');
const SuperAdmin = require('../pageobjects/superAdmin.js');

describe('Check elements in Home Page', () => {
  beforeAll('open browser', () => {
    browser.setWindowSize(1909, 1027);
    browser.url('https://joaco-megarocket-app.vercel.app/');
  });

  it('Super Admin Login', async () => {
    await HomePage.loginButton.click();
    await Login.logIn('superadminmega@gmail.com', 'SuperAdminMega1');
    await Login.acceptButton.click();
  });

  it('Check elements in Super Admin management menu', async () => {
    await expect(Header.title).toBeDisplayed();
    await expect(Header.logo).toBeDisplayed();
    await expect(Header.title).toHaveText('Super Admins');
    expect(Header.logo).toHaveAttribute('src', '/assets/images/logo-header.png');
    await expect(SuperAdmin.asideAdminButton).toBeDisplayed();
    await expect(SuperAdmin.asideAdminButton).toBeClickable();

    await expect(SuperAdmin.createAdminButton).toBeDisplayed();
    await expect(SuperAdmin.superAdminTable).toBeDisplayed();

    await expect(SuperAdmin.createAdminButton).toHaveTextContaining('Create');
    await expect(SuperAdmin.headersTable[0]).toHaveTextContaining('Name');
    await expect(SuperAdmin.headersTable[1]).toHaveTextContaining('Last Name');
    await expect(SuperAdmin.headersTable[2]).toHaveTextContaining('DNI');
    await expect(SuperAdmin.headersTable[3]).toHaveTextContaining('Phone');
    await expect(SuperAdmin.headersTable[4]).toHaveTextContaining('Email');
    await expect(SuperAdmin.headersTable[5]).toHaveTextContaining('City');

    await expect(SuperAdmin.allButtonsTable).toBeDisplayed();
    await expect(SuperAdmin.allButtonsTable).toBeClickable();

    await expect(SuperAdmin.editButton).toHaveTextContaining('Edit');
    await expect(SuperAdmin.editButton).toHaveTextContaining('X');
  });
});
