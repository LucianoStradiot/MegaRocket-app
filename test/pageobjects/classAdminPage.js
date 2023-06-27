class ClassesAdmin {
  get buttonCreateClasses () {
    return $('[data-testid="create-button-classes"]')
 }
 get formClasses () {
     return $('[data-testid="form-classes"]')
  }
  get selectDay() {
     return $('#day')
  }
  get selectHour() {
     return $('#hour')
  }
  get selectTrainer() {
     return $('#trainer')
  }
  get selectActivity() {
     return $('#activity')
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
}
export default new ClassesAdmin();