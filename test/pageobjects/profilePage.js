class ProfilePage {
  get inputName() {
    return $('[data-testid="member-first-name"] input');
  }
  get errorName() {
    return $('[data-testid="member-first-name"] p');
  }
  get inputLastName() {
    return $('[data-testid="member-last-name"] input');
  }
  get errorLastName() {
    return $('[data-testid="member-last-name"] p');
  }
  get inputDni() {
    return $('[data-testid="member-dni"] input');
  }
  get errorDni() {
    return $('[data-testid="member-dni"] p');
  }
  get inputPhone() {
    return $('[data-testid="member-phone"] input');
  }
  get errorPhone() {
    return $('[data-testid="member-phone"] p');
  }
  get inputCity() {
    return $('[data-testid="member-city"] input');
  }
  get errorCity() {
    return $('[data-testid="member-city"] p');
  }
  get inputZip() {
    return $('[data-testid="member-postal-code"] input');
  }
  get errorZip() {
    return $('[data-testid="member-postal-code"] p');
  }
  get inputDate() {
    return $('[data-testid="member-birthday"] input');
  }
  get btnEdit() {
    return $('section button');
  }
  get btnSave() {
    return $('[data-testid="member-confirm-button"]');
  }
  get modal() {
    return $('[data-testid="modal-success"]');
  }
  get acceptBtn() {
    return $('[data-testid="modal-success"] > button');
  }

  async setName(name) {
    await this.inputName.setValue(name);
  }
  async setLastName(lastname) {
    await this.inputLastName.setValue(lastname);
  }
  async setDni(dni) {
    await this.inputDni.setValue(dni);
  }
  async setPhone(phone) {
    await this.inputPhone.setValue(phone);
  }
  async setCity(city) {
    await this.inputCity.setValue(city);
  }
  async setZip(zip) {
    await this.inputZip.setValue(zip);
  }
  async setDate(zip) {
    await this.inputDate.setValue(date);
  }

  async edit(name, lastname, dni, phone, city, zip, date) {
    await this.inputName.setValue(name);
    await this.inputLastName.setValue(lastname);
    await this.inputDni.setValue(dni);
    await this.inputPhone.setValue(phone);
    await this.inputCity.setValue(city);
    await this.inputZip.setValue(zip);
    await this.inputDate.setValue(date);
    await this.btnSave.click();
  }

  open() {
    return browser.url('https://joaco-megarocket-app.vercel.app/profile');
  }
}

module.exports = new ProfilePage();
