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
    await Login.loginButton.waitForDisplayed();
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
    const labels = await SuperAdmin.labelsFormAdmins.map(label => label.getText());
    expect(labels[0]).toEqual('First name');
    expect(labels[1]).toEqual('Last name');
    expect(labels[2]).toEqual('DNI');
    expect(labels[3]).toEqual('Phone');
    expect(labels[4]).toEqual('Email');
    expect(labels[5]).toEqual('City');
    expect(labels[6]).toEqual('Password');

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
    await expect(SuperAdmin.cancelButtonForm).toHaveTextContaining('Cancel');
    await expect(SuperAdmin.resetButtonForm).toBeDisplayed();
    await expect(SuperAdmin.resetButtonForm).toBeClickable();
    await expect(SuperAdmin.resetButtonForm).toHaveTextContaining('Reset');
    await expect(SuperAdmin.addButtonForm).toBeDisplayed();
    await expect(SuperAdmin.addButtonForm).toBeClickable();
    await expect(SuperAdmin.addButtonForm).toHaveTextContaining('Add');
  });

  it('Check errors message in form with empty fields', async () => {
    await SuperAdmin.addButtonForm.click();

    await expect(SuperAdmin.errorMsgFormAdmins).toBeDisplayed();
    await expect(SuperAdmin.errorMsgFormAdmins[0]).toHaveTextContaining('First name can´t be empty');
    await expect(SuperAdmin.errorMsgFormAdmins[1]).toHaveTextContaining('Last name can´t be empty');
    await expect(SuperAdmin.errorMsgFormAdmins[2]).toHaveTextContaining('DNI can´t be empty');
    await expect(SuperAdmin.errorMsgFormAdmins[3]).toHaveTextContaining('Phone number can´t be empty');
    await expect(SuperAdmin.errorMsgFormAdmins[4]).toHaveTextContaining('Email can´t be empty');
    await expect(SuperAdmin.errorMsgFormAdmins[5]).toHaveTextContaining('City can´t be empty');
    await expect(SuperAdmin.errorMsgFormAdmins[6]).toHaveTextContaining('Password can´t be empty');
  });

  it('Check error message in form with incorrect data', async () => {
    await SuperAdmin.completeForm('test1', 'test1', '3879090a', '112844971a', 'test.test', 'test01', 'test10');
    await SuperAdmin.addButtonForm.click();

    await expect(SuperAdmin.errorMsgFormAdmins).toBeDisplayed();
    await expect(SuperAdmin.errorMsgFormAdmins[0]).toHaveTextContaining('First name must contain letters only');
    await expect(SuperAdmin.errorMsgFormAdmins[1]).toHaveTextContaining('Last name must contain letters only');
    await expect(SuperAdmin.errorMsgFormAdmins[2]).toHaveTextContaining('DNI must be only numbers');
    await expect(SuperAdmin.errorMsgFormAdmins[3]).toHaveTextContaining('Phone number must be only numbers');
    await expect(SuperAdmin.errorMsgFormAdmins[4]).toHaveTextContaining('Email must be in a valid format');
    await expect(SuperAdmin.errorMsgFormAdmins[5]).toHaveTextContaining('City must contain letters and spaces only');
    await expect(SuperAdmin.errorMsgFormAdmins[6]).toHaveTextContaining('Password must contain at least 8 characthers');
  });

  it('Check reset button', async () => {
    await SuperAdmin.resetButtonForm.click();
    await expect(SuperAdmin.inputsFormAdmins[0]).toHaveValue('');
    await expect(SuperAdmin.inputsFormAdmins[1]).toHaveValue('');
    await expect(SuperAdmin.inputsFormAdmins[2]).toHaveValue('');
    await expect(SuperAdmin.inputsFormAdmins[3]).toHaveValue('');
    await expect(SuperAdmin.inputsFormAdmins[4]).toHaveValue('');
    await expect(SuperAdmin.inputsFormAdmins[5]).toHaveValue('');
    await expect(SuperAdmin.inputsFormAdmins[6]).toHaveValue('');
  });

  it('Creating an admin successfully', async () => {
    await SuperAdmin.completeForm('testla', 'testla', '38790960', '1128448711', 'testlautiis@test.com', 'testla', 'Testla2023');
    await SuperAdmin.addButtonForm.click();

    await expect(SuperAdmin.modalSuccess).toBeDisplayed();
    await expect(SuperAdmin.modalSuccessTitle).toHaveTextContaining('Success');
    await expect(SuperAdmin.modalSuccessDescp).toBeDisplayed();
    await expect(SuperAdmin.modalSuccessDescp).toHaveTextContaining('Admin was created successfully!');
    await expect(SuperAdmin.modalSuccessButton).toBeDisplayed();
    await expect(SuperAdmin.modalSuccessButton).toBeClickable();

    await SuperAdmin.modalSuccessButton.click();
  });

  it('Data integrity on table', async () => {
    await SuperAdmin.lastRowTable.waitForDisplayed();
    const lastFieldsTable = await $$('[data-testid="container-table"] tbody tr:last-child td').map(element => element.getText());
    expect(await lastFieldsTable[0]).toEqual('testla');
    expect(await lastFieldsTable[1]).toEqual('testla');
    expect(await lastFieldsTable[2]).toEqual('38790960');
    expect(await lastFieldsTable[3]).toEqual('1128448711');
    expect(await lastFieldsTable[4]).toEqual('testlautiis@test.com');
    expect(await lastFieldsTable[5]).toEqual('testla');
  });

  it('Delete an admin flow', async () => {
    await SuperAdmin.deleteButton.click();

    await expect(SuperAdmin.modalConfirm).toBeDisplayed();
    await expect(SuperAdmin.modalConfirmTitle).toBeDisplayed();
    await expect(SuperAdmin.modalConfirmTitle).toHaveText('Confirm');
    await expect(SuperAdmin.modalConfirmDesc).toBeDisplayed();
    await expect(SuperAdmin.modalConfirmDesc).toHaveTextContaining('Are you sure you want to delete it?');

    await expect(SuperAdmin.acceptButtonModal).toBeDisplayed();
    await expect(SuperAdmin.acceptButtonModal).toBeClickable();
    await expect(SuperAdmin.cancelButtonModal).toBeDisplayed();
    await expect(SuperAdmin.cancelButtonModal).toBeClickable();

    await SuperAdmin.cancelButtonModal.click();
    await expect(SuperAdmin.rowsTable).toBeDisplayed();

    await SuperAdmin.deleteButton.click();
    await SuperAdmin.acceptButtonModal.click();

    await expect(SuperAdmin.modalSuccess).toBeDisplayed();
    await expect(SuperAdmin.modalSuccessTitle).toHaveTextContaining('Success');
    await expect(SuperAdmin.modalSuccessDescp).toHaveTextContaining('Admin successfully deleted!');

    await SuperAdmin.modalSuccessButton.click();
  });
});
