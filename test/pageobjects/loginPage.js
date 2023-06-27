class LoginPage {
  get inputEmail() {
    return $('[data-testId="input-email-login"]:nth-child(2)');
  }
  get inputDni() {
    return $('[data-testId="input-dni-login"]:nth-child(2');
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
  get errorDni() {
    return $(
      '[data-testId="input-dni-login"] + p'
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
  async setDni(dni) {
    await this.inputDni.setValue(dni);
  }

  async login(email, dni) {
    await this.inputEmail.setValue(email);
    await this.inputDni.setValue(dni);
    await this.btnLogin.click();
  }

  async  waitUntilModalDisplayed() {
    const modal = await $('[data-testid="modal-succes"]');
    await browser.wait(ExpectedConditions.visibilityOf(modal));
  }

  open() {
    return browser.url("https://joaco-megarocket-app.vercel.app/login");
  }
}

module.exports = new LoginPage();
