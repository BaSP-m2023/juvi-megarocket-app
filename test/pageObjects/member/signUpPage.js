class SignUpMember{

  get formSignUp () {
    return $('[data-testid="member-signup-form"]');
  }

  get inputName (){
    return $('[data-testid="member-signup-form"] fieldset input');
  }

  get inputLastName (){
    return $('[data-testid="member-signup-form"] fieldset:nth-child(2) input');
  }

  get inputDni(){
    return $('[data-testid="member-signup-form"] fieldset:nth-child(3) input');
  }

  get inputPhone(){
    return $('[data-testid="member-signup-form"] fieldset:nth-child(4) input');
  }

  get inputEmail(){
    return $('[data-testid="member-signup-form"] fieldset:nth-child(5) input');
  }

  get inputCity(){
    return $('[data-testid="member-signup-form"] fieldset:nth-child(6) input')
  }

  get inputBday(){
    return $('[data-testid="member-signup-form"] fieldset:nth-child(7) input');
  }

  get inputZip(){
    return $('[data-testid="member-signup-form"] fieldset:nth-child(8) input');
  }

  get inputPassword(){
    return $('[data-testid="member-signup-form"] fieldset:nth-child(9) input');
  }

  get inputSelect(){
    return $('#root > div > div > div > div > div > form > div:nth-child(1) > fieldset:nth-child(10) > select');
  }

  // get membershipOnlyClasses() {
  //   return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(11) option:nth-child(1)')
  // }
  // get membershipClassic() {
  //   return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(11) option:nth-child(2)')
  // }

  get membershipBlack() {
    return $('#root > div > div > div > div > div > form > div:nth-child(1) > fieldset:nth-child(10) > select > option:nth-child(3)')
  }


  get navbar(){
    return $('.navbar_navContainer__CNext');
  }

  get activitiesNavbar(){
    return $('.navbar_rutes__WzGHR > div:nth-child(2) > li:nth-child(1) > a:nth-child(1)')
  }

  get cardsActivities(){
    return $('[data-testid="member-cards-container"]');
  }

  async inputSelectClick(){
    await this.inputSelect.click();
  }

  async membershipBlackClick(){
    await this.membershipBlack.click();
  }

  async activitiesNavbarClick(){
    await this.activitiesNavbar.click();
  }

  async formSignUp(name, lastname, dni, phone, email, city, bday, zip, password, select) {
    await this.inputName.setValue(name);
    await this.inputLastName.setValue(lastname);
    await this.inputDni.setValue(dni);
    await this.inputPhone.setValue(phone);
    await this.inputEmail.setValue(email);
    await this.inputCity.setValue(city);
    await this.inputBday.setValue(bday);
    await this.inputZip.setValue(zip);
    await this.inputPassword.setValue(password);
    const select = 'Black';
    await this.inputSelect.selectByVisibleText(select);
  }

  async editFormMember(newPhone, newCity){
    await this.inputPhone.setValue(newPhone);
    await this.inputPassword.setValue(newCity);
  }

}

module.exports = new SignUpMember();