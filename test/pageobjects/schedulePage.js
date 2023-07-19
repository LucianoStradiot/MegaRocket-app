class SchedulePage {
  get table() {
    return $('.schedule_table__4CK8Q');
  }

  get firstButton() {
    return this.table.$('button');
  }

  async clickFirstButton() {
    const button = await this.firstButton;
    await button.click();
  }
}

module.exports = new SchedulePage();