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
  get logOut() {
    return $('a.aside_btn__HJ6H6.aside_btn2__8PWrF');
  }
  get modal() {
    return $('[data-testid="modal-confirm"]');
  }
  get confirmBtn() {
    return $('[data-testid="modal-confirm"] > button');
  }
  get profileBtn() {
    return $('[data-testid="container-aside-members"] a[href="/profile"]');
  }
  get scheduleBtn() {
    return $('[data-testid="container-aside-members"] a[href="/schedule"]');
  }
  get membershipBtn() {
    return $('[data-testid="container-aside-members"] a[href="/membership"]');
  }
}

module.exports = new MemberPage();








