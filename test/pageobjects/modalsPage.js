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
  get cancelButtonModal(){
    return $('[data-testid="modal-confirm"] button')
  }
  get confirmButtonModal(){
    return $('[data-testid="modal-confirm"] button:nth-child(2)')
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