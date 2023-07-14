class ForgotPassword {
  get recoverPasswdInput() {
    return $('[data-testid="input-email-recoverPassword"]:nth-child(2)');
  }

  get recoverPasswdBtn() {
    return $('[data-testid="confirm-button-login"]');
  }

  get errorMail() {
    return $(
      '[data-testid="input-email-recoverPassword"] + p'
    );
  }

  async setEmail(email) {
    await this.recoverPasswdInput.setValue(email);
  }

  openPage() {
    return browser.url('https://joaco-megarocket-app.vercel.app/recoverPassword');
  }
}

module.exports = new ForgotPassword();