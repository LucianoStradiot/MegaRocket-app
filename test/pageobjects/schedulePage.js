class SchedulePage {
  get spinningClass() {
    return $('#root > div > div > div > div.schedule_container__N1sHc > div > table > tbody > tr:nth-child(5) > td:nth-child(2) > div > button');
  }
  open() {
    return browser.url('https://joaco-megarocket-app.vercel.app/schedule');
  }
}
module.exports = new SchedulePage();