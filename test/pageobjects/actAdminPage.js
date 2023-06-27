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
 get errorMsgName(){
     return $('[data-testid="activities-input-name"] p');
 } /**Activity name can´t be shorter than 3 characters */
 get errorMsgDescription(){
     return $('[data-testid="activities-input-description"] p');
 }/**The description can´t be shorter than 40 characters */

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
}
export default new ActivitiesAdmin();