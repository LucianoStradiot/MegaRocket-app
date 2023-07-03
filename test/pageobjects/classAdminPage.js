class ClassesAdmin {
  get buttonCreateClasses() {
    return $('section a[href="/admins/classes/form"]');
  }
 get formClasses () {
     return $('[data-testid="form-classes"]');
  }
  get selectDay() {
     return $('#day')
  }
  get selectionDay(){
    return $('#day option:last-child')
  }
  get selectHour() {
     return $('#hour');
  }
  get selectionHour() {
    return $('#hour option:nth-child(12)');
 }
  get selectTrainer() {
     return $('#trainer');
  }
  get selectionTrainer() {
    return $('#trainer option:last-child');
 }
  get selectActivity() {
     return $('#activity');
  }
  get selectionActivity() {
    return $('#activity option:last-child');
 }
  get selectSlots() {
     return $('[data-testid="form-classes"] input');
  }
  get errorsMsg() {
     return $('[data-testid="form-classes"] p');
  }
  get cancelButtonClass() {
     return $('[data-testid="form-classes"] button');
  }
  get resetButtonClass() {
     return $('[data-testid="form-classes"] button:nth-child(2)');
  }
  get saveButtonClass() {
     return $('[data-testid="classes-save-button"]');
  }
  get addButtonClass() {
     return $('[data-testid="classes-add-button"]');
  }
  get editButtonClass(){
  return $('[data-testid="container-table"] tbody tr:last-child button');
  }
  get deleteButtonClass(){
  return $('[data-testid="container-table"] tbody tr:last-child button:nth-child(2)');
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
  async selectionDayClass(){
  await this.selectionDay.click();
  }
  async selectionHourClass(){
  await this.selectionHour.click();
  }
  async selectionTrainerClass(){
  await this.selectionTrainer.click();
  }
  async selectionActivityClass(){
  await this.selectionActivity.click();
  }
  async fillSlotsClass(slot) {
  await this.selectSlots.setValue(slot);
  }
}

module.exports = new ClassesAdmin();
