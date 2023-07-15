/* eslint-disable no-undef */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
class Login {
    get loginForm (){
      return $('[data-testid="container-login"]');
    }
    get emailInput() {
        return $('input[data-testid="input-email-login"]');
    }
    get labelEmail() {
      return $('label[data-testid="input-email-login"]');
    }
    get errorMail() {
      return $('[data-testId="input-email-login"] + p');
    }
    get passwordInput() {
        return $('input[data-testid="input-password-login"]');
    }
    get labelPassword() {
      return $('label[data-testid="input-password-login"]');
    }
    get errorPassword() {
      return $('[data-testId="input-password-login"] + p');
    }
    get cancelButton(){
      return $('[data-testid="container-login"] button');
    }
    get loginButton() {
      return $('[data-testid="confirm-button-login"]');
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