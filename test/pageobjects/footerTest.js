/* eslint-disable no-undef */
class footerTest {
  get logo() {
    return $('[data-testid="container-footer"] img');
  }

  get facebookIcon() {
    return $('[data-testid="container-footer"] ul li:nth-child(1) img');
  }
  get facebookLink() {
    return $('[data-testid="container-footer"] ul li:nth-child(1) a');
  }

  get instagramIcon() {
    return $('[data-testid="container-footer"] ul li:nth-child(2) img');
  }
  get instagramLink() {
    return $('[data-testid="container-footer"] ul li:nth-child(2) a');
  }

  get twitterIcon() {
    return $('[data-testid="container-footer"] ul li:nth-child(3) img');
  }
  get twitterLink() {
    return $('[data-testid="container-footer"] ul li:nth-child(3) a');
  }

  get copyRight() {
    return $('[data-testid="container-footer"] p');
  }
  get footer(){
    return $('[data-testid="container-footer"]');
  }
}

module.exports = new footerTest();