class MemberAdmin {
  get formMember() {
  return $('[data-testid="form-members"]');
  }
  get labelFirstName() {
      return $('[data-testid="member-first-name"] label');
  }
  get inputFirstName() {
      return $('[data-testid="member-first-name"] input');
  }
  get errorMsgFirstName() {
      return $('[data-testid="member-first-name"] p');
  }
  get labelLastName() {
      return $('[data-testid="member-last-name"] label');
  }
  get inputLastName() {
      return $('[data-testid="member-last-name"] input');
  }
  get errorMsgLastName() {
    return $('[data-testid="member-last-name"] p');
  }
  get labelDni() {
      return $('[data-testid=member-dni] label');
  }
  get inputDni() {
      return $('[data-testid=member-dni] input');
  }
  get errorMsgDni() {
    return $('[data-testid="member-dni"] p');
  }
  get labelPhone() {
      return $('[data-testid=member-phone] label');
  }
  get inputPhone() {
      return $('[data-testid=member-phone] input');
  }
  get errorMsgPhone() {
    return $('[data-testid="member-phone"] p');
  }
  get labelCity() {
      return $('[data-testid=member-city] label');
  }
  get inputCity() {
      return $('[data-testid=member-city] input');
  }
  get errorMsgCity() {
    return $('[data-testid="member-city"] p');
  }
  get labelPostalCode() {
      return $('[data-testid=member-postal-code] label');
  }
  get inputPostalCode() {
      return $('[data-testid=member-postal-code] input');
  }
  get errorMsgPostal() {
    return $('[data-testid="member-postal-code"] p');
  }
  get labelBirthDay() {
      return $('[data-testid=member-birthday] section label');
  }
  get inputBirthDay() {
      return $('[data-testid=member-birthday] section input');
  }
  get labelMembership() {
      return $('[data-testid=member-membership] label');
  }
  get inputMembership() {
    return $('[data-testid=member-membership] select');
}
  get cancelButtonMember() {
      return $('[data-testid="form-members"] button');
  }
  get resetButtonMember() {
      return $('[data-testid="form-members"] button:nth-child(2)');
  }
  get saveButtonMember() {
      return $('[data-testid="member-confirm-button"]');
  }
  get editButtonMember(){
    return $('tbody tr:last-child td:last-child a svg');
   }
   get deleteButtonMember(){
    return $('tbody tr:last-child td:last-child svg:nth-child(2)');
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
  async saveMemberClick() {
      await this.saveButtonMember.click();
  }
  async fillFirstName(name) {
    await this.inputFirstName.setValue(name);
  }
  async fillLastName(LastName) {
    await this.inputLastName.setValue(LastName);
  }
}
module.exports = new MemberAdmin();