class SubscriptionAdmin {
  get createSubs(){
    return $('[data-testid="create-button-subscriptions"]')
  }
  get formSubscriptions(){
    return $('[data-testid="form-subscriptions"]')
  }
  get labelsSubscriptions(){
    return $('[data-testid="form-subscriptions"] label')
  }// TRAIGO TODOS LOS LABELS
  get selectClasses(){
    return $('#classes')
  }
  get selectMemberEmail(){
    return $('#member')
  }
  get selectSubsDate(){
    return $('[data-testid="subs-date"]')
  }
  get cancelButtonSub(){
    return $('[data-testid="form-subscriptions"] button')
  }
  get resetButtonSubs(){
    return $('[data-testid="form-subscriptions"] button:nth-child(2)')
  }
  get confirmButtonSubs(){
    return $('[data-testid="subs-confirm-button"]')
  }// APLICA PARA SAVE Y ADD

  async createSubsClick() {
    await this.createSubs.click();
  }
  async cancelSubClick() {
    await this.cancelButtonSub.click();
  }
  async resetSubsClick() {
    await this.resetButtonSubs.click();
  }
  async confirmSubsClick() {
    await this.confirmButtonSubs.click();
  }
}

export default new SubscriptionAdmin();