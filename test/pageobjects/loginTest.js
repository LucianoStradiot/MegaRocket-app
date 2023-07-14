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
    get labelEmailLog() {
      return $('label[data-testid="input-email-login"]');
    }
    get errorEmailLog (){
      return $('[data-testid="container-login"] div p');
    }
    get passwordInput() {
        return $('input[data-testid="input-password-login"]');
    }
    get labelPasswordLog() {
      return $('label[data-testid="input-password-login"]');
    }
    get errorPasswordLog () {
      return $('[data-testid="container-login"] div:nth-child(2) p');
    }
    get loginButton() {
        return $('[data-testid="confirm-button-login"]');
    }
    get cancelButtonLog () {
      return $('[data-testid="container-login"] button');
    }
    get acceptButton() {
        return $('[data-testid="modal-success"] button');
    }
    async logIn(email, password) {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
};

module.exports = new Login();