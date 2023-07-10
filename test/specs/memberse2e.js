const SignUpPage = require ('../pageobjects/signUp.js');
const LoginPage = require ('../pageobjects/loginPage.js');
const MemberPage = require ('../pageobjects/memberPage.js');
const SchedulePage = require ('../pageobjects/schedulePage.js');
const MembershipPage = require ('../pageobjects/membershipPage.js');
const ForgotPassword = require ('../pageobjects/forgotPassword.js');

describe('Sign up flow', () => {
  it('should not let sign up with empty fields', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('', '', '', '', '', '', '', '','Choose a membership', '');
    await expect(SignUpPage.errorName).toBeDisplayed();
    await expect(SignUpPage.errorLastName).toBeDisplayed();
    await expect(SignUpPage.errorEmail).toBeDisplayed();
    await expect(SignUpPage.errorDni).toBeDisplayed();
    await expect(SignUpPage.errorPhone).toBeDisplayed();
    await expect(SignUpPage.errorCity).toBeDisplayed();
    await expect(SignUpPage.errorZip).toBeDisplayed();
    await expect(SignUpPage.errorDate).toBeDisplayed();
    await expect(SignUpPage.errorMembership).toBeDisplayed();
    await expect(SignUpPage.errorPassword).toBeDisplayed();
  });
  it('should not let sign up with empty name and last name', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('', '', 'example@a.com', '22345678', '2345678912', 'Montevideo', '11700', '02/04/1997','Black Membership', 'Password123');
    await expect(SignUpPage.errorName).toBeDisplayed();
    await expect(SignUpPage.errorLastName).toBeDisplayed();
  });
  it('should not let sign up with invalid mail and dni', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Katherine', 'Airala', 'invalid', 'invalid', '2234567891', 'Montevideo', '11700', '02/04/1997','Black Membership','Password123');
    await expect(SignUpPage.errorEmail).toBeDisplayed();
    await expect(SignUpPage.errorDni).toBeDisplayed();
  });
  it('should not let sign up with invalid phone and city', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Katherine', 'Airala', 'example@gmail.com', '4947558', 'invalid', '0', '11700', '02/04/1997','Black Membership', 'Password123');
    await expect(SignUpPage.errorEmail).toBeDisplayed();
    await expect(SignUpPage.errorDni).toBeDisplayed();
  });
  it('should not let sign up with invalid password', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Katherine', 'Airala', 'example@gmail.com', '4947558', 'invalid', '0', '11700', '02/04/1997','Black Membership', 'invalid');
    await expect(SignUpPage.errorEmail).toBeDisplayed();
    await expect(SignUpPage.errorDni).toBeDisplayed();
  });
  it('should not let sign up with existing user', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Katherine', 'Airala', 'kat@gmail.com', '4947558', '1234567891', 'Montevideo', '11700', '02/04/1997','Black Membership', 'Password123');
    await expect(SignUpPage.modal).toBeDisplayed();
    await SignUpPage.acceptBtn.click();
  });
  it('It should add a member with valid info', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Katerine', 'Airala', 'example@gmail.com', '5947558', '2234567891', 'Montevideo', '11700', '2/2/1997','Black Membership', 'Hola123456');
    await expect(SignUpPage.modal).toBeDisplayed();
    await SignUpPage.acceptBtn.click();
    await expect(browser).toHaveUrl(
      'https://joaco-megarocket-app.vercel.app/auth/login'
    );
  });
});

describe('Recover Password flow', () => {
  it('Should not recover the password with an empty email', async () => {
    await ForgotPassword.openPage();
    await ForgotPassword.setEmail('');
    await ForgotPassword.recoverPasswdBtn.click();
    await expect(ForgotPassword.errorMail).toBeDisplayed();
  });
  it('Should not recover the password with an invalid email', async () => {
    await ForgotPassword.openPage();
    await ForgotPassword.setEmail('invalid');
    await ForgotPassword.recoverPasswdBtn.click();
    await expect(ForgotPassword.errorMail).toBeDisplayed();
  });
  it('Should not recover the password with an unexisting email', async () => {
    await ForgotPassword.openPage();
    await ForgotPassword.setEmail('katt@gmail.com');
    await ForgotPassword.recoverPasswdBtn.click();
    await expect(ForgotPassword.modal).toBeDisplayed();
    await ForgotPassword.acceptBtn.click();
  });
  it('Should recover the password with a valid email', async () => {
    await ForgotPassword.openPage();
    await ForgotPassword.setEmail('kat@gmail.com');
    await ForgotPassword.recoverPasswdBtn.click();
    await expect(ForgotPassword.modal).toBeDisplayed();
    await ForgotPassword.acceptBtn.click();
  });
});

describe('Login flow', () => {
  it('Should display error message when login fields are empty', async () => {
    await LoginPage.open();
    await LoginPage.login('', '');
    await expect(LoginPage.errorMail).toBeDisplayed();
    await expect(LoginPage.errorPassword).toBeDisplayed();
  });
  it('Should display error message when email field is empty', async () => {
    await LoginPage.open();
    await LoginPage.login('', 'Password123');
    await expect(LoginPage.errorMail).toBeDisplayed();
  });
  it('Should display error message when dni field is empty', async () => {
    await LoginPage.open();
    await LoginPage.login('a@a.com', '');
    await expect(LoginPage.errorPassword).toBeDisplayed();
  });
  it('Should display error message with invalid credentials', async () => {
    await LoginPage.open();
    await LoginPage.login('invalid', '1234567');
    await expect(LoginPage.errorMail).toBeDisplayed();
    await expect(LoginPage.errorPassword).toBeDisplayed();
  });
  it('Should display error message with inexistent credentials', async () => {
    await LoginPage.open();
    await LoginPage.login('invalid@gmail.com', 'Password111');
    await expect(LoginPage.modal).toBeDisplayed();
    await LoginPage.acceptBtn.click();
  });
  it('Login should be successful with valid credentials', async () => {
    await LoginPage.open();
    await LoginPage.login('kat@gmail.com', 'Password123');
    await expect(LoginPage.modal).toBeDisplayed();
    await LoginPage.acceptBtn.click();
    await expect(browser).toHaveUrl(
      'https://joaco-megarocket-app.vercel.app/'
    );
  });
});

describe('Social media buttons', () => {
  it('should click on social media icons', async () => {
    await MemberPage.openMembersPage();
    await MemberPage.fbIcon.click();
    await MemberPage.igIcon.click();
    await MemberPage.twIcon.click();
  });
});

describe('Schedule a class', () => {
  it('should go to the schedule page', async () => {
    await HomePage.openHomePage();
    await HomePage.scheduleButton.click();
    await expect(browser).toHaveUrl('https://joaco-megarocket-app.vercel.app/schedule');
   });
   it('should select the spinning class', async () => {
    await SchedulePage.spinningClass.click();
    await expect(SchedulePage.modal).toBeDisplayed();
    await SchedulePage.acceptBtn.click();
    });
});

describe('Select a membership', () => {
  it('should go to the membership page', async () => {
    await HomePage.openHomePage();
    await HomePage.membershipsButton.click();
    await expect(browser).toHaveUrl('https://joaco-megarocket-app.vercel.app/membership');
    });
  it('should select the classic membership', async () => {
    await MembershipPage.classicMember.click();
    await expect(MembershipPage.modal).toBeDisplayed();
    await MembershipPage.acceptBtn.click();
    await expect(browser).toHaveUrl('https://joaco-megarocket-app.vercel.app/signUp?membership=Classic%20Membership');
    });
});
