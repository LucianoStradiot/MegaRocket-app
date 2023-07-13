/* eslint-disable no-undef */
class footerTest {
  get logo() {
    return $('[data-testid="container-footer"] img');
  }

  get facebookIcon() {
    return $('[data-testid="container-footer"] ul li:nth-child(1) img');
  }

  get instagramIcon() {
    return $('[data-testid="container-footer"] ul li:nth-child(2) img');
  }

  get twitterIcon() {
    return $('[data-testid="container-footer"] ul li:nth-child(3) img');
  }

  get copyRigth() {
    return $('[data-testid="container-footer"] p');
  }
}

module.exports = new footerTest();
