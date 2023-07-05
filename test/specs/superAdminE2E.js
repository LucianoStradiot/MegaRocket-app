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
    await expect(Header.title).toHaveText('Admins');
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
    await expect(SuperAdmin.deleteButton).toHaveTextContaining('X');

    await SuperAdmin.createAdminButton.click();
  });

  it('Check elements in form', async () => {
    await expect(SuperAdmin.superAdminForm).toBeDisplayed();
    await expect(SuperAdmin.labelsFormAdmins[0]).toHaveTextContaining('First Name');
    await expect(SuperAdmin.labelsFormAdmins[1]).toHaveTextContaining('Last Name');
    await expect(SuperAdmin.labelsFormAdmins[2]).toHaveTextContaining('DNI');
    await expect(SuperAdmin.labelsFormAdmins[3]).toHaveTextContaining('Phone');
    await expect(SuperAdmin.labelsFormAdmins[4]).toHaveTextContaining('Email');
    await expect(SuperAdmin.labelsFormAdmins[5]).toHaveTextContaining('City');
    await expect(SuperAdmin.labelsFormAdmins[6]).toHaveTextContaining('Password');

    await expect(SuperAdmin.inputsFormAdmins[0]).toBeDisplayed();
    await expect(SuperAdmin.inputsFormAdmins[0]).toBeClickable();
    await expect(SuperAdmin.inputsFormAdmins[1]).toBeDisplayed();
    await expect(SuperAdmin.inputsFormAdmins[1]).toBeClickable();
    await expect(SuperAdmin.inputsFormAdmins[2]).toBeDisplayed();
    await expect(SuperAdmin.inputsFormAdmins[2]).toBeClickable();
    await expect(SuperAdmin.inputsFormAdmins[3]).toBeDisplayed();
    await expect(SuperAdmin.inputsFormAdmins[3]).toBeClickable();
    await expect(SuperAdmin.inputsFormAdmins[4]).toBeDisplayed();
    await expect(SuperAdmin.inputsFormAdmins[4]).toBeClickable();
    await expect(SuperAdmin.inputsFormAdmins[5]).toBeDisplayed();
    await expect(SuperAdmin.inputsFormAdmins[5]).toBeClickable();
    await expect(SuperAdmin.inputsFormAdmins[6]).toBeDisplayed();
    await expect(SuperAdmin.inputsFormAdmins[6]).toBeClickable();

    await expect(SuperAdmin.cancelButtonForm).toBeDisplayed();
    await expect(SuperAdmin.cancelButtonForm).toBeClickable();
    await expect(SuperAdmin.resetButtonForm).toBeDisplayed();
    await expect(SuperAdmin.resetButtonForm).toBeClickable();
    await expect(SuperAdmin.addButtonForm).toBeDisplayed();
    await expect(SuperAdmin.addButtonForm).toBeClickable();
  });
});
