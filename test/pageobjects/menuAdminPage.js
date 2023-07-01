class NavBarAdmin {
  get activitiesButton() {
      return $('[data-testid="container-aside-general"] nav ul li:nth-child(1) a');
  }
  get classesButton() {
      return $('[data-testid="container-aside-general"] li:nth-child(2) a');
  }
  get membersButton() {
      return $('[data-testid="container-aside-general"] nav ul li:nth-child(3) a');
  }
  get subscriptionsButton() {
      return $('[data-testid="container-aside-general"] nav ul li:nth-child(4) a');
  }
  get trainersButton() {
      return $('[data-testid="container-aside-general"] nav ul li:nth-child(5) a');
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
  async subscriptionsClick() {
      await this.subscriptionsButton.click();
  }
  async trainersClick() {
      await this.trainersButton.click();
  }
}

module.exports = new NavBarAdmin();