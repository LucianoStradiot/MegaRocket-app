class SchedulePage {
  get spinningClass() {
    return $('#root > div > div > div > div.schedule_container__N1sHc > div > table > tbody > tr:nth-child(5) > td:nth-child(2) > div > button');
  }
  get modal() {
    return $('[data-testid="modal-confirm"]');
  }
  get confirmBtn() {
    return $('[data-testid="modal-confirm"] > button');
  }
  get secondModal() {
    return $('[data-testid="modal-success"]');
  }
  get acceptBtn() {
    return $('[data-testid="modal-success"] > button');
  }
  open() {
    return browser.url('https://joaco-megarocket-app.vercel.app/schedule');
  }
}
module.exports = new SchedulePage();