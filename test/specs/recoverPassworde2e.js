const ForgotPassword = require ('../pageobjects/forgotPassword.js');

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
    await ForgotPassword.setEmail('test@gmail.com');
    await ForgotPassword.recoverPasswdBtn.click();
    await expect(ForgotPassword.modal).toBeDisplayed();
    await ForgotPassword.acceptBtn.click();
  });
  it('Should recover the password with a valid email', async () => {
    await ForgotPassword.openPage();
    await ForgotPassword.setEmail('katt@gmail.com');
    await ForgotPassword.recoverPasswdBtn.click();
    await expect(ForgotPassword.modal).toBeDisplayed();
    await ForgotPassword.acceptBtn.click();
  });
});
