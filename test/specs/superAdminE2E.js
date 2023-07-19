/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const Header = require('../pageobjects/headerTest.js');
const HomePage = require('../pageobjects/homePage.js');
const Login = require('../pageobjects/loginTest.js');
const SuperAdmin = require('../pageobjects/superAdmin.js');
const Modals = require('../pageobjects/modals.js');

describe('Check elements in Home Page', () => {
  beforeAll('open browser', () => {
    browser.setWindowSize(1909, 1027);
    browser.url('https://joaco-megarocket-app.vercel.app/');
  });

  it('Super Admin Login', async () => {
    await HomePage.loginButton.click();
    await Login.loginButton.waitForDisplayed();
    await Login.logIn('superadmin@gmail.com', 'SuperAdmin1');

    await expect(Modals.modalSuccess).toBeDisplayed();
    await Modals.acceptButtonModal.click();
  });

  it('Check if the token is generated successfully', async() => {
    const token = await browser.execute(() => {
      return window.sessionStorage.getItem('token');
    });
    const role = await browser.execute(() => {
      return window.sessionStorage.getItem('role');
    });
    const firebaseUid = await browser.execute(() => {
      return window.sessionStorage.getItem('firebaseUid');
    });
    expect(token).toBeDefined();
    expect(firebaseUid).toBeDefined();
    expect(role).toBe('SUPER_ADMIN');
  });

  it('Check elements in Super Admin management menu', async () => {
    await expect(Header.title).toBeDisplayed();
    await expect(Header.title).toHaveText('Super Admin');
    await expect(Header.profileImage).toBeDisplayed();
    await expect(Header.logo).toBeDisplayed();
    expect(Header.logo).toHaveAttribute('src', '/assets/images/logo-header2.png');

    await expect(SuperAdmin.homeButton).toBeDisplayed();
    await expect(SuperAdmin.homeButton).toBeClickable();
    await expect(SuperAdmin.logoutButton).toBeDisplayed();
    await expect(SuperAdmin.logoutButton).toBeClickable();

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

    await SuperAdmin.createAdminButton.click();
  });

   it('Check elements in form', async () => {
    await expect(SuperAdmin.superAdminForm).toBeDisplayed();
    const labels = await SuperAdmin.labelsFormAdmins.map(label => label.getText());
    expect(labels[0]).toEqual('First name');
    expect(labels[1]).toEqual('Last name');
    expect(labels[2]).toEqual('DNI');
    expect(labels[3]).toEqual('Phone');
    expect(labels[4]).toEqual('City');
    expect(labels[5]).toEqual('Email');
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
    await expect(SuperAdmin.errorMsgFormAdmins[4]).toHaveTextContaining('City can´t be empty');
    await expect(SuperAdmin.errorMsgFormAdmins[5]).toHaveTextContaining('Email can´t be empty');
    await expect(SuperAdmin.errorMsgFormAdmins[6]).toHaveTextContaining('Password can´t be empty');
  });

  it('Check error message in form with short data', async () => {
    await SuperAdmin.completeFormCreate('te', 'te', '38', '11', 'te', 'te', 'te');
    await SuperAdmin.addButtonForm.click();

    await expect(SuperAdmin.errorMsgFormAdmins).toBeDisplayed();
    await expect(SuperAdmin.errorMsgFormAdmins[0]).toHaveTextContaining('First name can´t be shorter than 3 characters');
    await expect(SuperAdmin.errorMsgFormAdmins[1]).toHaveTextContaining('Last name can´t be shorter than 3 characters');
    await expect(SuperAdmin.errorMsgFormAdmins[2]).toHaveTextContaining('DNI must have 7-9 digits');
    await expect(SuperAdmin.errorMsgFormAdmins[3]).toHaveTextContaining('Phone number must have 10 digits');
    await expect(SuperAdmin.errorMsgFormAdmins[4]).toHaveTextContaining('City must have at least 4 characters');
    await expect(SuperAdmin.errorMsgFormAdmins[5]).toHaveTextContaining('Email must be in a valid format');
    await expect(SuperAdmin.errorMsgFormAdmins[6]).toHaveTextContaining('Password must contain at least 8 characthers');
  });

  it('Check error message in form with incorrect data', async () => {
    await SuperAdmin.completeFormCreate('test1', 'test1', '3879090a', '112844971a', 'test.test', 'test01', 'test1000');
    await SuperAdmin.addButtonForm.click();

    await expect(SuperAdmin.errorMsgFormAdmins).toBeDisplayed();
    await expect(SuperAdmin.errorMsgFormAdmins[0]).toHaveTextContaining('First name must contain letters only');
    await expect(SuperAdmin.errorMsgFormAdmins[1]).toHaveTextContaining('Last name must contain letters only');
    await expect(SuperAdmin.errorMsgFormAdmins[2]).toHaveTextContaining('DNI must be only numbers');
    await expect(SuperAdmin.errorMsgFormAdmins[3]).toHaveTextContaining('Phone number must be only numbers');
    await expect(SuperAdmin.errorMsgFormAdmins[4]).toHaveTextContaining('City must contain letters and spaces only');
    await expect(SuperAdmin.errorMsgFormAdmins[5]).toHaveTextContaining('Email must be in a valid format');
    await expect(SuperAdmin.errorMsgFormAdmins[6]).toHaveTextContaining('Password must contain at least one uppercase, one lowercase and one number');
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

  it('Create an admin successfully', async () => {
    await SuperAdmin.completeFormCreate('testla', 'testla', '38790960', '1128448711', 'testSA@test.com', 'testla', 'Testla2023');
    await SuperAdmin.addButtonForm.click();

    await expect(Modals.modalSuccess).toBeDisplayed();
    await expect(Modals.modalSuccessTitle).toHaveTextContaining('Success');
    await expect(Modals.modalSuccessDescp).toBeDisplayed();
    await expect(Modals.modalSuccessDescp).toHaveTextContaining('Admin was created successfully!');
    await expect(Modals.acceptButtonModal).toBeDisplayed();
    await expect(Modals.acceptButtonModal).toBeClickable();

    await Modals.acceptButtonModal.click();
  });

  it('Data integrity on table', async () => {
    await SuperAdmin.lastRowTable.waitForDisplayed();
    const lastFieldsTable = await $$('[data-testid="container-table"] tbody tr:last-child td').map(element => element.getText());
    expect(await lastFieldsTable[0]).toEqual('testla');
    expect(await lastFieldsTable[1]).toEqual('testla');
    expect(await lastFieldsTable[2]).toEqual('38790960');
    expect(await lastFieldsTable[3]).toEqual('1128448711');
    expect(await lastFieldsTable[4]).toEqual('testSA@test.com');
    expect(await lastFieldsTable[5]).toEqual('testla');
  });

  it('Check data in edit form', async() => {
    await SuperAdmin.editButton.click();
    await expect(SuperAdmin.superAdminForm).toBeDisplayed();

    await expect(SuperAdmin.inputsFormAdmins[0]).toHaveValue('testla');
    await expect(SuperAdmin.inputsFormAdmins[1]).toHaveValue('testla');
    await expect(SuperAdmin.inputsFormAdmins[2]).toHaveValue('38790960');
    await expect(SuperAdmin.inputsFormAdmins[3]).toHaveValue('1128448711');
    await expect(SuperAdmin.inputsFormAdmins[4]).toHaveValue('testla');
  });

  it('Check reset button in edit form', async() => {
    await SuperAdmin.resetButtonForm.click();

    await expect(SuperAdmin.inputsFormAdmins[0]).toHaveValue('');
    await expect(SuperAdmin.inputsFormAdmins[1]).toHaveValue('');
    await expect(SuperAdmin.inputsFormAdmins[2]).toHaveValue('');
    await expect(SuperAdmin.inputsFormAdmins[3]).toHaveValue('');
    await expect(SuperAdmin.inputsFormAdmins[4]).toHaveValue('');
  });

  it('Edit admin successfully', async() => {
    await SuperAdmin.completeFormEdit('testsa', 'testsa', '38790962', '1128448712', 'testsa');
    await SuperAdmin.saveButtonForm.click();

    await expect(Modals.modalSuccess).toBeDisplayed();
    await expect(Modals.modalSuccessTitle).toHaveTextContaining('Success');
    await expect(Modals.modalSuccessDescp).toBeDisplayed();
    await expect(Modals.modalSuccessDescp).toHaveTextContaining('Admin was updated successfully!');
    await expect(Modals.acceptButtonModal).toBeDisplayed();
    await expect(Modals.acceptButtonModal).toBeClickable();

    await Modals.acceptButtonModal.click();
  });

  it('Data integrity on table', async () => {
    await SuperAdmin.lastRowTable.waitForDisplayed();
    const lastFieldsTable = await $$('[data-testid="container-table"] tbody tr:last-child td').map(element => element.getText());
    expect(await lastFieldsTable[0]).toEqual('testsa');
    expect(await lastFieldsTable[1]).toEqual('testsa');
    expect(await lastFieldsTable[2]).toEqual('38790962');
    expect(await lastFieldsTable[3]).toEqual('1128448712');
    expect(await lastFieldsTable[4]).toEqual('testSA@test.com');
    expect(await lastFieldsTable[5]).toEqual('testsa');
  });

  it('Delete an admin flow', async () => {
    await SuperAdmin.deleteButton.click();

    await expect(Modals.modalConfirm).toBeDisplayed();
    await expect(Modals.modalConfirmTitle).toBeDisplayed();
    await expect(Modals.modalConfirmTitle).toHaveText('Confirm');
    await expect(Modals.modalConfirmDesc).toBeDisplayed();
    await expect(Modals.modalConfirmDesc).toHaveTextContaining('Are you sure you want to delete it?');

    await expect(Modals.confirmButtonModal).toBeDisplayed();
    await expect(Modals.confirmButtonModal).toBeClickable();
    await expect(Modals.cancelButtonModal).toBeDisplayed();
    await expect(Modals.cancelButtonModal).toBeClickable();

    await Modals.cancelButtonModal.click();

    await expect(SuperAdmin.rowsTable).toBeDisplayed();

    await SuperAdmin.deleteButton.click();

    await Modals.confirmButtonModal.waitForDisplayed();
    await Modals.confirmButtonModal.click();

    await expect(Modals.modalSuccess).toBeDisplayed();
    await expect(Modals.modalSuccessTitle).toHaveTextContaining('Success');
    await expect(Modals.modalSuccessDescp).toHaveTextContaining('Admin successfully deleted!');
    browser.pause(2000);
    await Modals.acceptButtonModal.click();
  });

  it('Check navigation from super admin menu to home page', async () => {
    await SuperAdmin.homeButton.click();

    const homeUrl = await browser.getUrl();
    expect(homeUrl).toEqual('https://joaco-megarocket-app.vercel.app/');
  });

  it('Check navigation from home page to super admin menu', async () => {
    await SuperAdmin.managementButton.click();

    const superAdminUrl = await browser.getUrl();
    expect(superAdminUrl).toEqual('https://joaco-megarocket-app.vercel.app/superAdmins/admins');
  });

  it('Logout flow', async() => {
    await SuperAdmin.logoutButton.click();

    await Modals.modalConfirm.waitForDisplayed();

    await expect(Modals.modalConfirm).toBeDisplayed();
    await expect(Modals.modalConfirmTitle).toHaveText('Confirm');
    await expect(Modals.modalConfirmDesc).toHaveTextContaining('Are you sure you want to logout?');
    await expect(Modals.confirmButtonModal).toBeDisplayed();
    await expect(Modals.confirmButtonModal).toBeClickable();
    await expect(Modals.cancelButtonModal).toBeDisplayed();
    await expect(Modals.cancelButtonModal).toBeClickable();

    await Modals.cancelButtonModal.click();

    await SuperAdmin.logoutButton.click();

    await Modals.confirmButtonModal.waitForDisplayed();
    await Modals.confirmButtonModal.click();

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/');
  });
});