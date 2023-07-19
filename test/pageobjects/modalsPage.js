/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
class Modals {
  get modalSuccess(){
    return $('[data-testid="modal-success"]');
  }
  get modalSuccessTitle(){
    return $('[data-testid="modal-success"] h3');
  }
  get modalSuccessDescp() {
    return $('[data-testid="modal-success"] p');
}
  get acceptButtonModal(){
    return $('[data-testid="modal-success"] button');
  }
  get modalConfirm(){
    return $('[data-testid="modal-confirm"]');
  }
  get modalConfirmTitle(){
    return $('[data-testid="modal-confirm"] h3');
  }
  get modalConfirmDesc(){
      return $('[data-testid="modal-confirm"] p');
  }
  get cancelButtonModal(){
    return $('[data-testid="modal-confirm"] button');
  }
  get confirmButtonModal(){
    return $('[data-testid="modal-confirm"] button:nth-child(2)');
  }
  async confirmModalClick() {
    await this.confirmButtonModal.click();
  }
  async acceptModalClick() {
    await this.acceptButtonModal.click();
  }
  async cancelModalClick() {
    await this.cancelButtonModal.click();
  }
}

module.exports = new Modals();