/* eslint-disable no-undef */
class SuperAdmin {
  get homeButton() {
    return $('aside a[href="/"]');
  }

  get logoutButton() {
    return $('nav div:nth-child(2) a');
  }

  get managementButton() {
    return $('nav a[href="/superAdmins/admins"]');
  }

  get createAdminButton() {
    return $('[data-testid="create-button-admins"]');
  }

  get superAdminTable() {
    return $('[data-testid="container-table"]');
  }

  get headersTable() {
    return $$('[data-testid="container-table"] th');
  }

  get rowsTable() {
    return $$('[data-testid="container-table"] tbody');
  }

  get lastRowTable() {
    return $('[data-testid="container-table"] tbody tr:last-child');
  }

  get allButtonsTable() {
    return $$('[data-testid="buttons-table"] svg');
  }

  get editButton() {
    return $('[data-testid="container-table"] tbody tr:last-child svg:nth-child(1)');
  }

  get deleteButton() {
    return $('[data-testid="container-table"] tbody tr:last-child svg:nth-child(2)');
  }

  get superAdminForm() {
    return $('[data-testid="admins-form"]');
  }

  get labelsFormAdmins() {
    return $$('[data-testid="admins-form"] label');
  }

  get inputsFormAdmins() {
    return $$('[data-testid="admins-form"] input');
  }

  get errorMsgFormAdmins() {
    return $$('[data-testid="admins-form"] p');
  }

  get cancelButtonForm() {
    return $$('button=Cancel');
  }

  get resetButtonForm() {
    return $('button=Reset');
  }

  get saveButtonForm() {
    return $('[data-testid="save-button-admins"]');
  }

  get addButtonForm() {
    return $('[data-testid="add-button-admins"]');
  }

  async completeFormCreate(fName, lName, dni, phone, email, city, password) {
    await this.inputsFormAdmins[0].setValue(fName);
    await this.inputsFormAdmins[1].setValue(lName);
    await this.inputsFormAdmins[2].setValue(dni);
    await this.inputsFormAdmins[3].setValue(phone);
    await this.inputsFormAdmins[4].setValue(city);
    await this.inputsFormAdmins[5].setValue(email);
    await this.inputsFormAdmins[6].setValue(password);
  }

  async completeFormEdit(fName, lName, dni, phone, city) {
    await this.inputsFormAdmins[0].setValue(fName);
    await this.inputsFormAdmins[1].setValue(lName);
    await this.inputsFormAdmins[2].setValue(dni);
    await this.inputsFormAdmins[3].setValue(phone);
    await this.inputsFormAdmins[4].setValue(city);
  }

  async verifyEmptyInputs(inputs) {
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i] != '') {
        return false;
      }
    }
    return true;
  }
}

module.exports = new SuperAdmin();
