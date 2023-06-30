/* eslint-disable no-undef */
class HomePage {
  get headerTitle() {
    return $('[data-testid="container-header"] > h1');
  }
}

module.exports = new HomePage();
