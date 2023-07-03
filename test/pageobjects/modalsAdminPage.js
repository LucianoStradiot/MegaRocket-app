class Modals {
  get modalSuccess(){
    return $('[data-testid="modal-success"]')
  }
  get modalSuccessTitle(){
    return $('[data-testid="modal-success"] h3')
  }
  get acceptButtonModal(){
    return $('[data-testid="modal-success"] button')
  }
  get modalConfirm(){
    return $('[data-testid="modal-confirm"]')
  }
  get confirmButtonModal(){
    return $('[data-testid="modal-confirm"] button')
  }

  async confirmModalClick() {
    await this.confirmButtonModal.click();
  }
  async acceptModalClick() {
    await this.acceptButtonModal.click();
  }
}

module.exports = new Modals();