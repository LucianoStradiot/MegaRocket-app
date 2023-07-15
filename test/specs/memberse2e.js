const HomePage = require ('../pageobjects/homePage.js');
const Login = require ('../pageobjects/loginTest.js');
const ProfilePage = require ('../pageobjects/profilePage.js');
const MemberPage = require ('../pageobjects/memberPage.js');
const SchedulePage = require ('../pageobjects/schedulePage.js');
const MembershipPage = require ('../pageobjects/membershipPage.js');
const Modals = require ('../pageobjects/modalsPage.js');

describe('Members Flow', () => {
  it('Login: Should redirect to the login page', async () => {
    await HomePage.open();
    await HomePage.loginButton.click();
    await expect(browser).toHaveUrl(
      'https://joaco-megarocket-app.vercel.app/auth/login'
    );
  });
  it('Login: Should display error message when login fields are empty', async () => {
    await Login.logIn('', '');
    await expect(Login.errorMail).toHaveTextContaining('Email can´t be empty');
    await expect(Login.errorPassword).toHaveTextContaining('Password can´t be empty');
  });
  it('Login: Should display error message when email field is empty', async () => {
    await Login.logIn('', 'Password123');
    await expect(Login.errorMail).toHaveTextContaining('Email can´t be empty');
  });
  it('Login: Should display error message when password field is empty', async () => {
    await Login.logIn('a@a.com', '');
    await expect(Login.errorPassword).toHaveTextContaining('Password can´t be empty');
  });
  it('Login: Should display error message with invalid credentials', async () => {
    await Login.logIn('invalid', '1234567');
    await expect(Login.errorMail).toHaveTextContaining('Email must be in a valid format');
    await expect(Login.errorPassword).toHaveTextContaining('Password must be at least 8 characters');
  });
  it('Login: Should display error message with inexistent credentials', async () => {
    await Login.logIn('invalid@gmail.com', 'Password111');
    await expect(Modals.modalSuccessTitle).toHaveTextContaining('Error!');
    await Modals.acceptButtonModal.click();
  });
  it('Login: should be successful with valid credentials', async () => {
    await Login.logIn('katt@gmail.com', 'Password1234');
    await expect(Modals.modalSuccessTitle).toHaveTextContaining('Success!');
    await Modals.acceptButtonModal.click();
    await expect(browser).toHaveUrl(
      'https://joaco-megarocket-app.vercel.app/'
    );
  });
  it('Profile: should show an error message when there is no changes', async () => {
    await MemberPage.profileBtn.click();
    await expect(browser).toHaveUrl('https://joaco-megarocket-app.vercel.app/profile');
    await ProfilePage.btnEdit.click();
    await expect(browser).toHaveUrl(
      'https://joaco-megarocket-app.vercel.app/profile/form/edit-member'
    );
    await ProfilePage.btnSave.click();
    await expect(Modals.modalSuccessTitle).toHaveTextContaining('Error!');
    await Modals.acceptButtonModal.click();
  });
  it('Profile: should show an error message when is empty', async () => {
    await ProfilePage.edit('', '', '', '', '', '', '');
    await expect(ProfilePage.errorName).toHaveTextContaining('First name can´t be empty');
    await expect(ProfilePage.errorLastName).toHaveTextContaining('Last name can´t be empty');
    await expect(ProfilePage.errorDni).toHaveTextContaining('DNI can´t be empty');
    await expect(ProfilePage.errorPhone).toHaveTextContaining('Phone number can´t be empty');
    await expect(ProfilePage.errorCity).toHaveTextContaining('City can´t be empty');
    await expect(ProfilePage.errorZip).toHaveTextContaining('Postal code can´t be empty');
    await ProfilePage.btnSave.click();
  });
  it('Profile: should edit the info', async () => {
    await ProfilePage.edit('Kat', 'Airala', '4947556', '2204178777', 'Montevideo', '11700', '02/04/1997');
    await ProfilePage.btnSave.click();
    await expect(Modals.modalSuccessTitle).toHaveTextContaining('Success!');
    await Modals.acceptButtonModal.click();
  });
  /*it('Class: should select the spinning class', async () => {
    await MemberPage.scheduleBtn.click();
    await expect(browser).toHaveUrl(
      'https://joaco-megarocket-app.vercel.app/schedule'
    );
    await SchedulePage.spinningClass.click();
    await expect(Modals.modalConfirm).toBeDisplayed();
    await Modals.confirmButtonModal.click();
    await expect(Modals.modalSuccess).toBeDisplayed();
    await Modals.acceptButtonModal.click();
  });
  it('Class: should delete the spinning class', async () => {
    await SchedulePage.spinningClass.click();
    await expect(Modals.modalConfirm).toBeDisplayed();
    await SchedulePage.confirmBtn.click();
    await expect(SchedulePage.secondModal).toBeDisplayed();
    await SchedulePage.acceptBtn.click();
  });*/
  it('Membership: should select a membership', async () => {
    await MemberPage.membershipBtn.click();
    await expect(browser).toHaveUrl(
      'https://joaco-megarocket-app.vercel.app/membership'
    );
    await MembershipPage.classicMember.click();
    await expect(browser).toHaveUrl('https://joaco-megarocket-app.vercel.app/');
  });
  it('Social Media: should open social media', async () => {
    await MemberPage.fbIcon.click();
    await MemberPage.igIcon.click();
    await MemberPage.twIcon.click();
  });
  it('Logout', async () => {
    await MemberPage.logOut.click();
    await expect(Modals.modalConfirm).toBeDisplayed();
    await Modals.confirmButtonModal.click();
    await expect(browser).toHaveUrl('https://joaco-megarocket-app.vercel.app/');
  });
});
