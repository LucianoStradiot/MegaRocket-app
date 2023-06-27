class ClassesAdmin {
  get buttonCreateClasses () {
    return $('[data-testid="create-button-classes"]')
 }
 get formClasses () {
     return $('[data-testid="form-classes"]')
  }
  get selectDay() {
     return $('#day >  option:nth-child(3)')
  }
  get selectHour() {
     return $('#hour >  option:nth-child(3)')
  }
  get selectTrainer() {
     return $('#trainer >  option:nth-child(3)')
  }
  get selectActivity() {
     return $('#activity >  option:nth-child(3)')
  }
  get selectSlots() {
     return $('[data-testid="form-classes"] input')
  }
  get errorsMsg() {
     return $('[data-testid="form-classes"] p')
  }
  get cancelButtonClass() {
     return $('[data-testid="form-classes"] button')
  }
  get resetButtonClass() {
     return $('[data-testid="form-classes"] button:nth-child(2)')
  }
  get saveButtonClass() {
     return $('[data-test-id="classes-save-button"]')
  }
  get addButtonClass() {
     return $('[data-testid="classes-add-button"]')
  }
  get modalSuccess(){
    return $('[data-testid="modal-success"]')
   }
  get modalSuccessTitle(){
    return $('[data-testid="modal-success"] > h3')
  }
  get confirmButtonClass(){
    return $('[data-testid="modal-success"] > button')
  }
  get modalConfirm(){
    return $('[data-testid="modal-confirm"]');
  }
  get acceptButtonClass(){
    return $('[data-testid="modal-confirm"] > button')
  }
  get editButtonClass(){
  return $('[data-testid="container-table"] tbody tr:last-child button');
  }
  get deleteButtonClass(){
  return $('[data-testid="container-table"] tbody tr:last-child button:nth-child(2)')
  }
  async acceptClassClick() {
  await this.acceptButtonClass.click();
  }
  async editClassClick() {
    await this.editButtonClass.click();
  }
  async deleteClassClick() {
    await this.deleteButtonClass.click();
  }
  async confirmModalClick() {
    await this.modalConfirm.click();
  }
  async editClassClick() {
    await this.editButtonClass.click();
  }
  async deleteClassClick() {
    await this.deleteButtonClass.click();
  }
  async createClassesClick() {
      await this.buttonCreateClasses.click();
  }
  async cancelClassClick() {
      await this.cancelButtonClass.click();
  }
  async resetClassClick() {
      await this.resetButtonClass.click();
  }
  async saveClassClick() {
      await this.saveButtonClass.click();
  }
  async addClassClick() {
      await this.addButtonClass.click();
  }
  async fillSelectSlots() {
  await this.selectSlots.setValue()
  }
  async selectionDayClass(){
  await this.selectDay.click();
  }
  async selectionHourClass(){
  await this.selectHour.click();
  }
  async selectionTrainerClass(){
  await this.selectTrainer.click();
  }
  async selectionActivityClass(){
  await this.selectActivity.click();
  }
  async fillSlotsClass() {
  await this.selectSlots.setValue()
  }
}

module.exports = new ClassesAdmin();
