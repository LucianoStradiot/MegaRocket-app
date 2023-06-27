class MemberAdmin {
  get createMembers() {
    return $('[data-testid="create-button-members"]')
  }
  get formMember() {
  return $('[data-testid="form-members"]')
  }
  get labelFirstName() {
      return $('[data-testid="member-first-name"] label')
  }
  get inputFirstName() {
      return $('[data-testid="member-first-name"] input')
  }
  get ErrorMsgFirstName() {
      return $('[data-testid="member-first-name"] p')
  }
  get labelLastName() {
      return $('[data-testid="member-last-name"] label')
  }
  get inputLastName() {
      return $('[data-testid="member-last-name"] input')
  }
  get labelEmail() {
      return $('[data-testid=member-email] label')
  }
  get inputEmail() {
      return $('[data-testid=member-email] input')
  }
  get labelDni() {
      return $('[data-testid=member-dni] label')
  }
  get inputDni() {
      return $('[data-testid=member-dni] input')
  }
  get labelPhone() {
      return $('[data-testid=member-phone] label')
  }
  get inputPhone() {
      return $('[data-testid=member-phone] input')
  }
  get labelCity() {
      return $('[data-testid=member-city] label')
  }
  get inputCity() {
      return $('[data-testid=member-city] input')
  }
  get labelPostalCode() {
      return $('[data-testid=member-postal-code] label')
  }
  get inputPostalCode() {
      return $('[data-testid=member-postal-code] input')
  }
  get labelBirthDay() {
      return $('[data-testid=member-birthday] label')
  }
  get inputBirthDay() {
      return $('[data-testid=member-birthday] input')
  }
  get labelMembership() {
      return $('[data-testid=member-membership] label')
  }
  get inputMembership() {
      return $('[data-testid=member-membership] input')
  }
  get labelActive() {
      return $('[data-testid=member-active] label')
  }
  get inputActive() {
      return $('[data-testid=member-active] input')
  }
  get cancelButtonMember() {
      return $('[data-testid="form-members"] button')
  }
  get resetButtonMember() {
      return $('[data-testid="form-members"] button:bth-child(2)')
  }
  get confirmButtonMember() {
      return $('{data-testid="member-confirm-button"')
  }// aplica para save y add
  async createMemberClick() {
      await this.createMember.click();
  }
  async cancelMemberClick() {
      await this.cancelButtonMember.click();
  }
  async resetMemberClick() {
      await this.resetButtonMember.click();
  }
  async confirmMemberClick() {
      await this.confirmButtonMember.click();
  }
  async fillInputFirstName() {
    await this.inputFirstName.setValue()
  }
  async fillInputLastName() {
    await this.inputLastName.setValue()
  }
  async fillInputEmail() {
    await this.inputEmail.setValue()
  }
  async fillInputDni() {
    await this.inputDni.setValue()
  }
  async fillInputPhone() {
    await this.inputPhone.setValue()
  }
  async fillInputCity() {
    await this.inputCity.setValue()
  }
  async fillInputBirthDay() {
    await this.inputBirthDay.setValue()
  }
  async fillInputMembership() {
    await this.inputMembership.setValue()
  }

}
export default new MemberAdmin();