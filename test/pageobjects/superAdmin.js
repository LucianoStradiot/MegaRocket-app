/* eslint-disable no-undef */
class SuperAdmin {
  get createAdminButton() {
    return $('section a[href="/superAdmins/form"]');
  }

  get superAdminTable() {
    return $('[data-testid="container-table"]');
  }

  get headerTable() {
    return $('[data-testid="container-table"] th');
  }

  get lastRowTable() {
    return $('[data-testid="container-table"] tbody tr:last-child');
  }

  get editButton() {
    return $('[data-testid="container-table"] tbody tr:last-child button:nth-child(1)');
  }

  get deleteButton() {
    return $('[data-testid="container-table"] tbody tr:last-child button:nth-child(2)');
  }

  get superAdminForm() {
    return $('#form');
  }

  get labelsForm() {
    return $$('#form label');
  }

  get inputEmail() {
    return $('#form input[name="email"]');
  }

  get inputPassword() {
    return $('#form input[name="password"]');
  }

  get errorMsgs() {
    return $$('#form p');
  }

  get buttonsForm() {
    return $$('#form button');
  }

  get modalSuccess() {
    return $('[data-testid="modal-success"]');
  }

  get modalSuccessTitle() {
    return $('[data-testid="modal-success] h3');
  }

  get modalSuccessDescp() {
    return $('[data-testid="modal-success] p');
  }

  get modalSuccessButton() {
    return $('[data-testid="modal-success] button');
  }

  get modalConfirm() {
    return $('[data-testid="modal-success"]');
  }

  get modalConfirmTitle() {
    return $('[data-testid="modal-success"] h3');
  }

  get modalConfirmDesc() {
    return $('[data-testid="modal-success"] p');
  }

  get acceptButtonModal() {
    return $('[data-testid="modal-confirm"] button:nth-child(3)');
  }

  get cancelButtonModal() {
    return $('[data-testid="modal-confirm"] button:nth-child(3)');
  }
}

module.exports = new SuperAdmin();
