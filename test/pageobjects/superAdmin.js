/* eslint-disable no-undef */
class SuperAdmin {
  get asideAdminButton() {
    return $('aside a');
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
    return $$('[data-testid="buttons-table"] button');
  }

  get editButton() {
    return $('[data-testid="container-table"] tbody tr:last-child button:nth-child(1)');
  }

  get deleteButton() {
    return $('[data-testid="container-table"] tbody tr:last-child button:nth-child(2)');
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
    return $$('[data-testid="admins-form"] button:nth-child(1)');
  }

  get resetButtonForm() {
    return $('[data-testid="admins-form"] button:nth-child(2)');
  }

  get saveButtonForm() {
    return $('[data-testid="save-button-admins"]');
  }

  get addButtonForm() {
    return $('[data-testid="add-button-admins"]');
  }

  get modalSuccess() {
    return $('[data-testid="modal-success"]');
  }

  get modalSuccessTitle() {
    return $('[data-testid="modal-success"] h3');
  }

  get modalSuccessDescp() {
    return $('[data-testid="modal-success"] p');
  }

  get modalSuccessButton() {
    return $('[data-testid="modal-success"] button');
  }

  get modalConfirm() {
    return $('[data-testid="modal-confirm"]');
  }

  get modalConfirmTitle() {
    return $('[data-testid="modal-confirm"] h3');
  }

  get modalConfirmDesc() {
    return $('[data-testid="modal-confirm"] p');
  }

  get acceptButtonModal() {
    return $('[data-testid="modal-confirm"] button:nth-child(3)');
  }

  get cancelButtonModal() {
    return $('[data-testid="modal-confirm"] button:nth-child(4)');
  }

  async completeForm(fName, lName, dni, phone, email, city, password) {
    await this.inputsFormAdmins[0].setValue(fName);
    await this.inputsFormAdmins[1].setValue(lName);
    await this.inputsFormAdmins[2].setValue(dni);
    await this.inputsFormAdmins[3].setValue(phone);
    await this.inputsFormAdmins[4].setValue(email);
    await this.inputsFormAdmins[5].setValue(city);
    await this.inputsFormAdmins[6].setValue(password);
  }
}

module.exports = new SuperAdmin();
