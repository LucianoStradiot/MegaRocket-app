/* eslint-disable no-undef */
class HomePage {
  get headerLogo() {
    return $('[data-testid="container-header"] img');
  }
  get sidebarHome() {
    return $('[data-testid="container-aside-members"]');
  }
  get loginButtonHome() {
    return $('[data-testid="container-aside-members"] a:nth-child(1)');
  }
  get signUpButton() {
    return $('[data-testid="container-aside-members"] a:nth-child(2)');
  }
  get loginForm (){
    return $('[data-testid="container-login"]')
  }
  get labelEmailLog() {
    return $('label[data-testid="input-email-login"]');
  }
  get inputEmailLog() {
    return $('input[data-testid="input-email-login"]');
  }
  get errorEmailLog (){
    return $('[data-testid="container-login"] div p')
  }
  get labelPasswordLog() {
    return $('label[data-testid="input-password-login"]');
  }
  get inputPasswordLog() {
    return $('input[data-testid="input-password-login"]');
  }
  get errorPasswordLog (){
    return $('[data-testid="container-login"] div:nth-child(2) p')
  }
  get cancelButtonLog () {
    return $('[data-testid="container-login"] button');
  }
  get loginButtonLog () {
    return $('[data-testid="container-login"] button:nth-child(2)');
  }
  async loginClickHome(){
      await this.loginButtonHome.click();
    }
  async fillInputEmail(email) {
    await this.inputEmailLog.setValue(email)
  }
  async fillInputPassword(password) {
    await this.inputPasswordLog.setValue(password)
  }
  async logClick(){
    await this.loginButtonLog.click();
  }

}
module.exports = new HomePage();
