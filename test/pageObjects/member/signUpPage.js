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
    return $('[data-testid="member-signup-form"] fieldset:nth-child(10) select');
  }

  async formSignUp(name, lastname, dni, phone, email, city, bday, zip, password) {
    await this.inputName.setValue(name);
    await this.inputLastName.setValue(lastname);
    await this.inputDni.setValue(dni);
    await this.inputPhone.setValue(phone);
    await this.inputEmail.setValue(email);
    await this.inputCity.setValue(city);
    await this.inputBday.setValue(bday);
    await this.inputZip.setValue(zip);
    await this.inputPassword.setValue(password);
  }

}

module.exports = new SignUpMember();