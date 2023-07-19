class MembershipPage {
  get classicMember() {
    return $('[data-testid="memberships-container-page"] div.memberships_cardContainer__U3Pmt.memberships_classic__3H90B');
  }
  get blackMember() {
    return $('[data-testid="memberships-container-page"] div.memberships_cardContainer__U3Pmt.memberships_black__ZwAe4');
  }
  get onlyClassesMember() {
    return $('[data-testid="memberships-container-page"] div.memberships_cardContainer__U3Pmt.memberships_only__y05wD');
  }
}
module.exports = new MembershipPage();

