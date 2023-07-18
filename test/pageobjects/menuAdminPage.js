class NavBarAdmin {
  get homeButton() {
    return $('a[href="/"]');
  }
  get logOutButton() {
    return $('[data-testid="container-aside-general"] a:nth-child(2)');
  }
  get logOutButtonHome() {
    return $('[data-testid="container-aside-members"] a:nth-child(2)');
  }
  get activitiesButton() {
      return $('a[href="/admins/activities"]');
  }
  get classesButton() {
      return $('a[href="/admins/classes"]');
  }
  get membersButton() {
      return $('a[href="/admins/members"]');
  }
  get subscriptionButton() {
    return $('[data-testid="container-aside-general"] div a:nth-child(4)');
  }
  get trainersButton() {
      return $('a[href="/admins/trainers"]');
  }
  get managementButton(){
    return $('a[href="/admins/activities"]');
  }
  async homeClick() {
    await this.homeButton.click();
  }
  async logOutClick() {
    await this.logOutButton.click();
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
  async managementClick() {
    await this.managementButton.click();
}
}

module.exports = new NavBarAdmin();