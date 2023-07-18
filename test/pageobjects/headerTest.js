/* eslint-disable no-undef */
class HeaderTest {
  get containerHeader() {
    return $('[data-testid="container-header"]');
  }

  get title() {
    return $('[data-testid="container-header"] > h1');
  }

  get logo() {
    return $('[data-testid="container-header"] div:nth-child(2) img');
  }
}

module.exports = new HeaderTest();
