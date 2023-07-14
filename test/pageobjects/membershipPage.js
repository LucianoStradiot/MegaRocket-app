class MembershipPage {
  get classicMember() {
    return $('[data-testid="memberships-container-page"] a:nth-child(2)');
  }
  open() {
    return browser.url('https://joaco-megarocket-app.vercel.app/membership');
  }
}
module.exports = new MembershipPage();

