class MemberAdmin {
  get createMembers() {
    return $('section a [href="/admins/members/form"]')
  }//[data-testid="create-button-members"]
  get formMember() {
  return $('[data-testid="form-members"]')
  }
  get labelFirstName() {
      return $('[data-testid="member-first-name"] label')
  }
  get inputFirstName() {
      return $('[data-testid="member-first-name"] input')
  }
  get errorMsgFirstName() {
      return $('[data-testid="member-first-name"] p')
  }
  get labelLastName() {
      return $('[data-testid="member-last-name"] label')
  }
  get inputLastName() {
      return $('[data-testid="member-last-name"] input')
  }
  get errorMsgLastName() {
    return $('[data-testid="member-last-name"] p')
  }
  get labelEmail() {
      return $('[data-testid=member-email] label')
  }
  get inputEmail() {
      return $('[data-testid=member-email] input')
  }
  get errorMsgEmail() {
    return $('[data-testid="member-email"] p')
  }
  get labelDni() {
      return $('[data-testid=member-dni] label')
  }
  get inputDni() {
      return $('[data-testid=member-dni] input')
  }
  get errorMsgDni() {
    return $('[data-testid="member-dni"] p')
  }
  get labelPhone() {
      return $('[data-testid=member-phone] label')
  }
  get inputPhone() {
      return $('[data-testid=member-phone] input')
  }
  get errorMsgPhone() {
    return $('[data-testid="member-phone"] p')
  }
  get labelCity() {
      return $('[data-testid=member-city] label')
  }
  get inputCity() {
      return $('[data-testid=member-city] input')
  }
  get errorMsgCity() {
    return $('[data-testid="member-city"] p')
  }
  get labelPostalCode() {
      return $('[data-testid=member-postal-code] label')
  }
  get inputPostalCode() {
      return $('[data-testid=member-postal-code] input')
  }
  get errorMsgPostal() {
    return $('[data-testid="member-postal-code"] p')
  }
  get labelBirthDay() {
      return $('[data-testid=label-date-picker]')
  }
  get inputBirthDay() {
      return $('[data-testid=member-birthday] input')
  }
  get errorMsgBirthDay() {
    return $('[data-testid="member-birthday"] p')
  }

  // find how to select a date


  get labelMembership() {
      return $('[data-testid=member-membership] label')
  }
  get inputSelectMembership() {
    return $('[data-testid=member-membership] select')
}
  get selectMembership() {
      return $('[data-testid=member-membership] select option:nth-child(3) ')
  }
  get errorSelectMembership() {
    return $('[data-testid=member-membership] select option:nth-child(1) ')
}
  get errorMsgMembership() {
    return $('[data-testid="member-membership"] p')
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
  get editButtonMember(){
    return $('[data-testid="container-table"] tr:last-child button:nth-child(1)');
   }
   get deleteButtonMember(){
    return $('[data-testid="container-table"] tr:last-child button:nth-child(2)')
   }


  async createMemberClick() {
      await this.createMember.click();
  }
  async cancelMemberClick() {
      await this.cancelButtonMember.click();
  }
  async resetMemberClick() {
      await this.resetButtonMember.click();
  }
  async editMemberClick() {
    await this.editButtonMember.click();
  }
  async deleteMemberClick() {
    await this.deleteButtonMember.click();
}
  async confirmMemberClick() {
      await this.confirmButtonMember.click();
  }
  async fillInputFirstName(name) {
    await this.inputFirstName.setValue(name)
  }
  async fillInputLastName(LastName) {
    await this.inputLastName.setValue(LastName)
  }
  async fillInputEmail(email) {
    await this.inputEmail.setValue(email)
  }
  async fillInputDni(dni) {
    await this.inputDni.setValue(dni)
  }
  async fillInputPhone(phone) {
    await this.inputPhone.setValue(phone)
  }
  async fillInputCity(city) {
    await this.inputCity.setValue(city)
  }
  // async ClickBirthDay() {
  //   await this.inputBirthDay.setValue()
  // }
  async clickMembership() {
    await this.selectMembership.click()
  }
  async clickErrorMembership() {
    await this.errorSelectMembership.click()
  }

}
module.exports = new MemberAdmin();