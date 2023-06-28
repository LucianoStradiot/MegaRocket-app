class SchedulePage {
  get spinningClass() {
    return $('[data-testid="memberships-container-page"]');
  }
  get modal() {
    return $('[data-testid="modal-success"]');
  }
  get acceptBtn() {
    return $('[data-testid="modal-success"] > button');
  }
}
module.exports = new SchedulePage();