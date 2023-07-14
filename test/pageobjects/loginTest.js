/* eslint-disable no-undef */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
class Login {
  get emailInput() {
    return $('input[data-testid="input-email-login"]');
  }
  get passwordInput() {
    return $('input[data-testid="input-password-login"]');
   }
 get errorMail() {
   return $('[data-testId="input-email-login"] + p');
  }
  get errorPassword() {
    return $('[data-testId="input-password-login"] + p');
  }
  get loginButton() {
    return $('[data-testid="confirm-button-login"]');
  }
  get acceptButton() {
    return $('[data-testid="modal-success"] button');
  }
  get modal() {
    return $('[data-testid="modal-success"]');
  }
  get acceptBtn() {
    return $('[data-testid="modal-success"] > button');
  }
  get forgotPassword() {
    return $('[data-testid="container-login"] .login_password__rDUIU a');
  }
  
  async logIn(email, password) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
 }

  open() {
    return browser.url('https://joaco-megarocket-app.vercel.app/auth/login');
  }
};

module.exports = new Login();