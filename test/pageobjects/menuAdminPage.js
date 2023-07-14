class NavBarAdmin {
  get homeButton() {
    return $('[data-testid="container-aside-general"] div li:nth-child(1) a');
  }
  get logOutButton() {
    return $('[data-testid="container-aside-general"] a:nth-child(2) li a');
  }
  get activitiesButton() {
      return $('[data-testid="container-aside-general"] div:nth-child(2) li a');
  }
  get classesButton() {
      return $('[data-testid="container-aside-general"] div li:nth-child(2) a');
  }
  get membersButton() {
      return $('[data-testid="container-aside-general"] div li:nth-child(3) a');
  }
  get subscriptionButton() {
    return $('[data-testid="container-aside-general"] div:nth-child(2) a:nth-child(4)');
  }
  get trainersButton() {
      return $('[data-testid="container-aside-general"] div:nth-child(2) a:nth-child(5)');
  }
  async activityClick() {
      await this.activitiesButton.click();
  }
  async classesClick() {
      await this.classesButton.click();
  }
  async membersClick() {
      await this.membersButton.click();
  }
  async subscriptionClick() {
      await this.subscriptionButton.click();
  }
  async trainersClick() {
      await this.trainersButton.click();
  }
}

module.exports = new NavBarAdmin();