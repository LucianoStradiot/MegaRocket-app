class TrainerAdmin {
  get buttonCreateTrainer(){
    return $('[data-testid="create-button-trainers"]')
  }
  get formTrainers(){
    return $('#form-trainers')
  }
  get labelFirstName() {
    return $('#form-trainers div:nth-child(1) div label')
  }
  get inputFirstName(){
    return $('#firstName')
  }
  get labelLastName() {
    return $('#form-trainers div:nth-child(2) div label')
}
  get inputLastName(){
    return $('#lastName')
  }
  get labelDni() {
    return $('#form-trainers div:nth-child(3) div label')
}
  get inputDni(){
    return $('#dni')
  }
  get labelPhone() {
    return $('#form-trainers div:nth-child(4) div label')
}
  get inputPhone(){
    return $('#phone')
  }
  get labelEmail() {
    return $('#form-trainers div:nth-child(5) div label')
}
  get inputEmail(){
    return $('#email')
  }
  get labelCity() {
    return $('#form-trainers div:nth-child(7) div label')
}
  get inputCity(){
    return $('#city')
  }
  get labelPassword() {
    return $('[data-testid=input-password-login]')
}
  get inputPassword(){
    return $('input[data-testid=input-password-login]')
  }
  get labelSalary() {
    return $('#form-trainers div:nth-child(8) div label')
}
  get inputSalary(){
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
    return $('tbody tr:last-child td:last-child a');
  }
  get deleteButtonTrainer(){
    return $('tbody tr:last-child td:last-child svg:nth-child(2)');
  }
  get errorMsgName(){
    return $('#form-trainers div:nth-child(1) div p')
  }
  get errorMsgLName(){
    return $('#form-trainers div:nth-child(2) div p')
  }
  get errorMsgDni(){
    return $('#form-trainers div:nth-child(3) div p')
  }
  get errorMsgPhone(){
    return $('#form-trainers div:nth-child(4) div p')
  }
  get errorMsgEmail(){
    return $('#form-trainers div:nth-child(5) div p')
  }
  get errorMsgCity(){
    return $('#form-trainers div:nth-child(6) div p')
  }
  get errorMsgPassword(){
    return $('#form-trainers div:nth-child(7) div p')
  }
  get errorMsgSalary(){
    return $('#form-trainers div:nth-child(8) div p')
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
  async fillInputName(firstName) {
    await this.inputFirstName.setValue(firstName)
  }
  async fillInputLName(lastName) {
    await this.inputLastName.setValue(lastName)
  }
  async fillInputDni(dni) {
    await this.inputDni.setValue(dni)
  }
  async fillInputPhone(phone) {
    await this.inputPhone.setValue(phone)
  }
  async fillInputEmail(email) {
    await this.inputEmail.setValue(email)
  }
  async fillInputCity(city) {
    await this.inputCity.setValue(city)
  }
  async fillInputPassword(password) {
    await this.inputPassword.setValue(password)
  }
  async fillInputSalary(salary) {
    await this.inputSalary.setValue(salary)
  }
}
module.exports = new TrainerAdmin();

