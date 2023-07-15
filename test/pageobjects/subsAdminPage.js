import { deleteSubscription } from "Redux/Subscriptions/thunks";

class SubscriptionAdmin {
  get formSubscriptions(){
    return $('[data-testid="form-subscriptions"]')
  }
  get labelsSubscriptions(){
    return $('[data-testid="form-subscriptions"] label')
  }// TRAIGO TODOS LOS LABELS
  get deleteSubscription(){
    return $('tbody tr:last-child td:last-child svg')
  }
  async deleteSubsClick() {
    await this.deleteSubscription.click();
  }
}

export default new SubscriptionAdmin();