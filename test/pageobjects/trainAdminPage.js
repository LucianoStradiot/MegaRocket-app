class TrainerAdmin {
  get formTrainers(){
    return $('#form-trainers')
  }
  get inputFirstNameT(){
    return $('#firstName')
  }
  get inputLastNameT(){
    return $('#lastName')
  }
  get inputDniT(){
    return $('#dni')
  }
  get inputPhoneT(){
    return $('#phone')
  }
  get inputEmailT(){
    return $('#email')
  }
  get inputCityT(){
    return $('#city')
  }
  get inputPasswordT(){
    return $('#password')
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
  get errorInputNameTrainer(){
    return $('#form-trainers > div.form-trainers_subContainer__RDgRc > div:nth-child(1) > div > p')
  }
  get errorInputLNameTrainer(){
    return $('#form-trainers > div.form-trainers_subContainer__RDgRc > div:nth-child(2) > div > p')
  }
  get errorInputDNITrainer(){
    return $('#form-trainers > div.form-trainers_subContainer__RDgRc > div:nth-child(3) > div > p')
  }
  get errorInputPhoneTrainer(){
    return $('#form-trainers > div.form-trainers_subContainer__RDgRc > div:nth-child(4) > div > p')
  }
  get errorInputEmailTrainer(){
    return $('#form-trainers > div.form-trainers_subContainer__RDgRc > div:nth-child(5) > div > p')
  }
  get errorInputCityTrainer(){
    return $('#form-trainers > div.form-trainers_subContainer__RDgRc > div:nth-child(6) > div > p')
  }
  get errorInputPasswordTrainer(){
    return $('#form-trainers > div.form-trainers_subContainer__RDgRc > div:nth-child(7) > div > p')
  }
  get errorInputPasswordTrainer(){
    return $('#form-trainers > div.form-trainers_subContainer__RDgRc > div:nth-child(8) > div > p')
  }
  async fillInputNameT(firstName) {
    await this.inputFirstNameT.setValue(firstName)
  }
  async fillInputLNameT(lastName) {
    await this.inputLastNameT.setValue(lastName)
  }
  async fillInputDniT(dni) {
    await this.inputLastNameT.setValue(dni)
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
  async fillInputSalaryT() {
    await this.inputSalaryT.setValue()
  }
}
export default new TrainerAdmin();

