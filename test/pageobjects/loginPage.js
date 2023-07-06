class LoginPage {
  get inputEmail() {
    return $('[data-testId="input-email-login"]:nth-child(2)');
  }
  get inputPassword() {
    return $('[data-testId="input-password-login"]:nth-child(2)');
  }
  get btnLogin() {
    return $('[data-testid="confirm-button-login"]');
  }
  get btnCancel() {
    return $('[data-testid="container-login"] button');
  }
  get btnReset() {
    return $('[data-testid="container-login"] button:nth-child(2)');
  }
  get errorMail() {
    return $(
      '[data-testId="input-email-login"] + p'
    );
  }
  get errorPassword() {
    return $(
      '[data-testId="input-password-login"] + p'
    );
  }
  get modal() {
    return $('[data-testid="modal-success"]');
  }

  get acceptBtn() {
    return $('[data-testid="modal-success"] > button');
  }

  async setEmail(email) {
    await this.inputEmail.setValue(email);
  }
  async setPassword(password) {
    await this.inputPassword.setValue(password);
  }

  async login(email, password) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.btnLogin.click();
  }

  async  waitUntilModalDisplayed() {
    const modal = await $('[data-testid="modal-succes"]');
    await browser.wait(ExpectedConditions.visibilityOf(modal));
  }

  open() {
    return browser.url("https://joaco-megarocket-app.vercel.app/auth/login");
  }
}

module.exports = new LoginPage();
