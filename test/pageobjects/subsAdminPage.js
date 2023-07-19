class SubscriptionAdmin {
  get deleteSubscription(){
    return $('tbody tr:last-child td:last-child svg')
  }
  async deleteSubsClick() {
    await this.deleteSubscription.click();
  }
}

module.exports = new SubscriptionAdmin();