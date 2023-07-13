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

    get loginButton() {
        return $('[data-testid="confirm-button-login"]');
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