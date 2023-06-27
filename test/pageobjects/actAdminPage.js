class ActivitiesAdmin {
  get buttonCreateActivities () {
    return $('[data-testid="create-button-activities"]')
 }
 get  formActivities(){
     return $('#form');
 }
 get containerInputName() {
     return $('[data-testid="activities-input-name"]');
 }
 get containerInputDescription() {
     return $('[data-testid="activities-input-description"]');
 }
 get statusActivities() {
     return $('[data-testid="activities-status"]');
 }
 get statusOption1() {
     return $('[data-testid="activities-status"] > select option:nth-child(1)');
 }
 get statusOption2() {
     return $('[data-testid="activities-status"] > select option:nth-child(2)');
 }
 get  cancelButtonAct(){
     return $('#form > div > div.FormActivities_btnContainer__1hnR3 > div > button:nth-child(1)');
 }
 get  resetButtonAct(){
     return $('#form > div > div.FormActivities_btnContainer__1hnR3 > div > button:nth-child(2)');
 }
 get  saveButtonAct(){
     return $('[data-testid="activities-save-button"]');
 }
 get addButtonAct(){
     return $('[data-testid="activities-add-button"]');
 }
 get editButtonAct(){
  return $('[data-testid="buttons-table"] > a > button')
 }
 get deleteButtonAct(){
  return $('[data-testid="buttons-table"] > button')
 }
 get modalSuccess(){
  return $('[data-testid="modal-success"]')
 }
 get modalSuccessTitle(){
  return $('[data-testid="modal-success"] > h3')
 }
 get acceptButtonAct(){
  return $('[data-testid="modal-success"] > button')
 }
 get errorMsgName(){
     return $('[data-testid="activities-input-name"] p');
 }
 get errorMsgDescription(){
     return $('[data-testid="activities-input-description"] p');
 }

 async createActClick() {
     await this.buttonCreateActivities.click();
 }
 async cancelActClick() {
     await this.cancelButtonAct.click();
 }
 async resetActClick() {
     await this.resetButtonAct.click();
 }
 async saveActClick() {
     await this.saveButtonAct.click();
 }
 async addActClick() {
     await this.addButtonAct.click();
 }
 async acceptActClick() {
  await this.acceptButtonAct.click();
}
async editActClick() {
  await this.editButtonAct.click();
}
async deleteActClick() {
  await this.deleteButtonAct.click();
}
 async fillContainerInputName() {
  await this.containerInputName.setValue()
}
async fillContainerInputDescription() {
  await this.containerInputDescription.setValue()
}
}
export default new ActivitiesAdmin();
