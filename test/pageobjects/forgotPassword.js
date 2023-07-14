class ForgotPassword {
  get recoverPasswdInput() {
    return $('[data-testid="input-email-recoverPassword"]:nth-child(2)');
  }

  get recoverPasswdBtn() {
    return $('[data-testid="confirm-button-login"]');
  }

  get modal() {
    return $('[data-testid="modal-success"]');
  }

  get acceptBtn() {
    return $('[data-testid="modal-success"] > button');
  }

  get errorMail() {
    return $(
      '[data-testid="input-email-recoverPassword"] + p'
    );
  }

  async setEmail(email) {
    await this.recoverPasswdInput.setValue(email);
  }

  async  waitUntilModalDisplayed() {
    const modal = await $('[data-testid="modal-succes"]');
    await browser.wait(ExpectedConditions.visibilityOf(modal));
  }

  openPage() {
    return browser.url('https://joaco-megarocket-app.vercel.app/recoverPassword');
  }
}

module.exports = new ForgotPassword();