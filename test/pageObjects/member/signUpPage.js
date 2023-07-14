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

  get inputEmail(){
    return $('[data-testid="member-signup-form"] fieldset:nth-child(3) input');
  }
  get inputRepeatEmail(){
    return $('[data-testid="member-signup-form"] fieldset:nth-child(4) input')
  }

  get inputDni(){
    return $('[data-testid="member-signup-form"] fieldset:nth-child(5) input');
  }

  get inputPhone(){
    return $('[data-testid="member-signup-form"] fieldset:nth-child(6) input');
  }

  get inputCity(){
    return $('[data-testid="member-signup-form"] div:nth-child(2) fieldset:nth-child(1) input');
  }

  get inputBday(){
    return $('[data-testid="member-signup-form"] div:nth-child(2) fieldset:nth-child(2) input');
  }

  get inputZip(){
    return $('[data-testid="member-signup-form"] div:nth-child(2) fieldset:nth-child(3) input');
  }

  get inputPassword(){
    return $('[data-testid="member-signup-form"] div:nth-child(2) fieldset:nth-child(4) input');
  }

  get inputSelect(){
    return $('[data-testid="member-signup-form"] select');
  }

  get optionSelectBlack(){
    return $('[data-testid="member-signup-form"] select option:nth-child(3)');
  }

  get membershipBlack() {
    return $('#root > div > div > div > div > div > form > div:nth-child(1) > fieldset:nth-child(10) > select > option:nth-child(3)');
  }

  get navbar(){
    return $('[data-testid="navbar"]');
  }

  get SingUpNavbar(){
    return $('[data-testid="navbar"] li:nth-child(3) a ');
  }

  get homeNavbar(){
    return $('[data-testid="navbar"] li:nth-child(1) a');
  }

  async inputSelectClick(){
    await this.inputSelect.click();
  }

  async membershipBlackClick(){
    await this.membershipBlack.click();
  }

  async homeNavbarClick(){
    await this.homeNavbar.click();
  }

  async SingUpNavbarClick(){
    await this.SingUpNavbar.click();
  }

  async optionSelectBlackClick(){
    await this.optionSelectBlack.click();
  }

  async formSignUp(name, lastname, email, repeatEmail, dni, phone, city, bday, zip, password) {
    await this.inputName.setValue(name);
    await this.inputLastName.setValue(lastname);
    await this.inputEmail.setValue(email);
    await this.inputRepeatEmail.setValue(repeatEmail)
    await this.inputDni.setValue(dni);
    await this.inputPhone.setValue(phone);
    await this.inputCity.setValue(city);
    await this.inputBday.setValue(bday);
    await this.inputZip.setValue(zip);
    await this.inputPassword.setValue(password);
  }
}

module.exports = new SignUpMember();