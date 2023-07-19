/* eslint-disable no-undef */
class HeaderTest {
  get containerHeader() {
    return $('[data-testid="container-header"]');
  }

  get title() {
    return $('[data-testid="container-header"] p');
  }

  get profileImage() {
    return $('[data-testid="container-header"] div:nth-child(1) img');
  }

  get logo() {
    return $('[data-testid="container-header"] div:nth-child(2) img:last-child');
  }
}

module.exports = new HeaderTest();
