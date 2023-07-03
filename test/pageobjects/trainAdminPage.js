class TrainerAdmin {
  get buttonCreateTrainer(){
    return $('[data-testid="create-button-trainers"]')
  }
  get formTrainers(){
    return $('#form-trainers')
  }
  get labelFirstNameT() {
    return $('div:nth-child(1) div label')
  }
  get inputFirstNameT(){
    return $('#firstName')
  }
  get labelLastNameT() {
    return $('div:nth-child(2) div label')
}
  get inputLastNameT(){
    return $('#lastName')
  }
  get labelDniT() {
    return $('div:nth-child(3) div label')
}
  get inputDniT(){
    return $('#dni')
  }
  get labelPhoneT() {
    return $('div:nth-child(4) div label')
}
  get inputPhoneT(){
    return $('#phone')
  }
  get labelEmailT() {
    return $('div:nth-child(5) div label')
}
  get inputEmailT(){
    return $('#email')
  }
  get labelCityT() {
    return $('div:nth-child(6) div label')
}
  get inputCityT(){
    return $('#city')
  }
  get labelPasswordT() {
    return $('div:nth-child(7) div label')
}
  get inputPasswordT(){
    return $('#password')
  }
  get labelSalaryT() {
    return $('div:nth-child(8) div label')
}
  get inputSalaryT(){
    return $('#salary')
  }
  get trainerActive(){
    return $('#form-trainers select')
  }
  get cancelButtonTrainer(){
    return $('#form-trainers button')
  }
  get resetButtonTrainer(){
    return $('#form-trainers button:nth-child(2)')
  }
  get saveButtonTrainer(){
    return $('[data-testid="trainer-save-button"]')
  }
  get addButtonTrainer(){
    return $('[data-testid="trainer-add-button"]')
  }
  get editButtonTrainer(){
    return $('[data-testid="container-table"] tbody tr:last-child button');
  }
  get deleteButtonTrainer(){
    return $('[data-testid="container-table"] tbody tr:last-child button:nth-child(2)');
  }
  get errorMsgNameT(){
    return $('div:nth-child(1) div p')
  }
  get errorMsgLNameT(){
    return $('div:nth-child(2) div p')
  }
  get errorMsgDniT(){
    return $('div:nth-child(3) div p')
  }
  get errorMsgPhoneT(){
    return $('div:nth-child(4) div p')
  }
  get errorMsgEmailT(){
    return $('div:nth-child(5) div p')
  }
  get errorMsgCityT(){
    return $('div:nth-child(6) div p')
  }
  get errorMsgPasswordT(){
    return $('div:nth-child(7) div p')
  }
  get errorMsgSalaryT(){
    return $('div:nth-child(8) div p')
  }

  async createTrainerClick() {
    await this.buttonCreateTrainer.click()
  }
  async cancelTrainerClick() {
    await this.cancelButtonTrainer.click()
  }
  async resetTrainerClick() {
    await this.resetButtonTrainer.click()
  }
  async saveTrainerClick() {
    await this.saveButtonTrainer.click()
  }
  async addTrainerClick() {
    await this.addButtonTrainer.click()
  }
  async editTrainerClick() {
    await this.editButtonTrainer.click();
  }
  async deleteTrainerClick() {
    await this.deleteButtonTrainer.click();
  }
  async fillInputNameT(firstName) {
    await this.inputFirstNameT.setValue(firstName)
  }
  async fillInputLNameT(lastName) {
    await this.inputLastNameT.setValue(lastName)
  }
  async fillInputDniT(dni) {
    await this.inputDniT.setValue(dni)
  }
  async fillInputPhoneT(phone) {
    await this.inputPhoneT.setValue(phone)
  }
  async fillInputEmailT(email) {
    await this.inputEmailT.setValue(email)
  }
  async fillInputCityT(city) {
    await this.inputCityT.setValue(city)
  }
  async fillInputPasswordT(password) {
    await this.inputPasswordT.setValue(password)
  }
  async fillInputSalaryT(salary) {
    await this.inputSalaryT.setValue(salary)
  }
}
module.exports = new TrainerAdmin();

