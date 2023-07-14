class SignUpPage {
  get inputFirstName() {
    return $('[data-testid="first-name-sign-up"]:nth-child(2)');
  }
  get inputLastName() {
    return $('[data-testid="last-name-sign-up"]:nth-child(2)');
  }
  get inputEmail() {
    return $('[data-testid="email-sign-up"]:nth-child(2)');
  }
  get inputDni() {
    return $('[data-testid="dni-sign-up"]:nth-child(2)');
  }
  get inputPhone() {
    return $('[data-testid="phone-sign-up"]:nth-child(2)');
  }
  get inputCity() {
    return $('[data-testid="city-sign-up"]:nth-child(2)');
  }
  get inputZip() {
    return $('[data-testid="postal-code-sign-up"]:nth-child(2)');
  }
  get inputDate() {
    return $('[data-testid="sign-up-form"] section input');
  }
  get inputMemberShip() {
    return $('[data-testid="sign-up-form"] select');
  }
  get inputPassword() {
    return $('[data-testid="input-password-login"]:nth-child(2)');
  }
  get addBtn() {
    return $('[data-testid="sign-up-confirm-button"]');
  }
  get errorName() {
    return $(
      '[data-testid="first-name-sign-up"] + p'
    );
}
get errorLastName() {
  return $(
    '[data-testid="last-name-sign-up"] + p'
  );
}
get errorEmail() {
  return $(
    '[data-testid="email-sign-up"] + p'
  );
}
get errorDni() {
  return $(
    '[data-testid="dni-sign-up"] + p'
  );
}
get errorPhone() {
  return $(
   '[data-testid="phone-sign-up"] + p'
  );
}
get errorCity() {
  return $(
    '[data-testid="city-sign-up"] + p'
  );
}
get errorZip() {
  return $(
    '[data-testid="postal-code-sign-up"] + p'
  );
}
get errorDate() {
  return $(
    '[data-testid="sign-up-form"] section input + p'
  );
}
get errorMembership() {
  return $(
    '[data-testid="sign-up-form"] select + p'
  );
}
get errorPassword() {
  return $(
    '[data-testid="input-password-login"]:nth-child(2)+ p'
  );
}
get modal() {
  return $('[data-testid="modal-success"]');
}
get acceptBtn() {
  return $('[data-testid="modal-success"] > button');
}
async setFirstName(firstName) {
  await this.inputFirstName.setValue(firstName);
}
async setLastName(lastName) {
  await this.inputLastName.setValue(lastName);
}
async setEmail(email) {
  await this.inputEmail.setValue(email);
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
async setDate(date) {
  await this.inputDate.setValue(date);
}
async setMembership(membership) {
  await this.inputMemberShip.selectByVisibleText(membership);
}
async setPassword(password) {
  await this.inputPassword.setValue(password);
}
async addMember(firstName, lastName, email, dni, phone, city, zip, date, membership, password) {
  await this.setFirstName(firstName);
  await this.setLastName(lastName);
  await this.setEmail(email);
  await this.setDni(dni);
  await this.setPhone(phone);
  await this.setCity(city);
  await this.setZip(zip);
  await this.setDate(date);
  await this.setMembership(membership);
  await this.setPassword(password);
  await this.addBtn.click();
}
openSignUpPage() {
  return browser.url("https://joaco-megarocket-app.vercel.app/signUp");
}
}

module.exports = new SignUpPage();