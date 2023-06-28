class MemberPage {
  get imgBtn() {
    return $('[data-testid="container-header"] img');
  }
  get fbIcon() {
    return $('[data-testid="container-footer"] ul li:nth-child(1) img');
  }
  get igIcon() {
    return $('[data-testid="container-footer"] ul li:nth-child(2) img');
  }
  get twIcon() {
    return $('[data-testid="container-footer"] ul li:nth-child(3) img');
  }

  openMembersPage() {
    return browser.url("https://joaco-megarocket-app.vercel.app/member/schedule");
  }
}

module.exports = new MemberPage();








