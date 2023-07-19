const HomePage = require ('../pageobjects/homePage.js');
const Login = require ('../pageobjects/loginTest.js');
const ForgotPassword = require ('../pageobjects/forgotPassword.js');
const Modals = require ('../pageobjects/modalsPage.js');

describe('Recover Password flow', () => {
  it('Should redirect us to the recover password page', async () => {
    await HomePage.open();
    await HomePage.loginButton.click();
    await Login.forgotPassword.click();
    await expect(browser).toHaveUrl(
      'https://joaco-megarocket-app.vercel.app/recoverPassword'
    );
  });
  it('Should not recover the password with an empty email', async () => {
    await ForgotPassword.setEmail('');
    await ForgotPassword.recoverPasswdBtn.click();
    await expect(ForgotPassword.errorMail).toHaveTextContaining('Email can´t be empty');
  });
  it('Should not recover the password with an invalid email', async () => {
    await ForgotPassword.openPage();
    await ForgotPassword.setEmail('invalid');
    await ForgotPassword.recoverPasswdBtn.click();
    await expect(ForgotPassword.errorMail).toHaveTextContaining('Email must be in a valid format');
  });
  it('Should not recover the password with an unexisting email', async () => {
    await ForgotPassword.openPage();
    await ForgotPassword.setEmail('test@gmail.com');
    await ForgotPassword.recoverPasswdBtn.click();
    await expect(Modals.modalSuccessTitle).toHaveTextContaining('Error!');
    await Modals.acceptButtonModal.click();
  });
  it('Should recover the password with a valid email', async () => {
    await ForgotPassword.openPage();
    await ForgotPassword.setEmail('katt@gmail.com');
    await ForgotPassword.recoverPasswdBtn.click();
    await expect(Modals.modalSuccessTitle).toHaveTextContaining('Recovering password...');
    await Modals.acceptButtonModal.click();
  });
});
