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
  get activitiesNavbar(){
    return $('[data-testid="navbar"] li:nth-child(2) a');
  }

  get memebershipNavbar(){
    return $('[data-testid="navbar"] li:nth-child(4)');
  }

  get screenActivities(){
    return $('[data-testid="member-cards-container"]');
  }

  get cardGap(){
    return $('#root > div > div > div > div > div:nth-child(4) > div:nth-child(2)');
  }

  get cardText(){
    return $('#root > div > div > div > div > div:nth-child(4) > div:nth-child(2) > div.activity_cardText__zFkmK > p');
  }

  get membershipScreen(){
    return $('[data-testid="member-membership-screen"]');
  }

  get membershipCardClassic(){
    return $('[data-testid="member-membership-screen"] div div:nth-child(2)');
  }

  get membershipCardClassickList(){
    return $('[data-testid="member-membership-screen"] div div:nth-child(2) ul');
  }

  get inputSignInEmail(){
    return $('[data-testid="signin-form"] fieldset:nth-child(1) input');
  }

  get inputSignInPassword(){
    return $('[data-testid="signin-form"] fieldset:nth-child(2) input');
  }

  get inputEditName(){
    return $('[data-testid="member-profile-edit-form"] fieldset:nth-child(2) input')
  }

  get inputEditLastName(){
    return $('[data-testid="member-profile-edit-form"] fieldset:nth-child(3) input')
  }

  get inputEditDni(){
    return $('[data-testid="member-profile-edit-form"] fieldset:nth-child(4) input')
  }

  get inputEditPhone(){
    return $('[data-testid="member-profile-edit-form"] fieldset:nth-child(5) input')
  }

  get inputEditEmail(){
    return $('[data-testid="member-profile-edit-form"] fieldset:nth-child(6) input')
  }

  get inputEditCity(){
    return $('[data-testid="member-profile-edit-form"] fieldset:nth-child(7) input')
  }

  get inputEditBday(){
    return $('[data-testid="member-profile-edit-form"] fieldset:nth-child(8) input')
  }

  get inputEditZip(){
    return $('[data-testid="member-profile-edit-form"] fieldset:nth-child(9) input')
  }

  get inputEditPassword(){
    return $('[data-testid="member-profile-edit-form"] fieldset:nth-child(10) input')
  }

  get inputSelect(){
    return $('[data-testid="member-profile-edit-form"] select');
  }

  get optionSelectClassic(){
    return $('[data-testid="member-profile-edit-form"] select option:nth-child(2)');
  }

  get profileMemberNavbar(){
    return $('[data-testid="navbar"] li:nth-child(3) a');
  }

  async profileMemberNavbarClick(){
    await this.profileMemberNavbar.click();
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
  async homeNavbarClick(){
    await this.homeNavbar.click();
  }

  async SingUpNavbarClick(){
    await this.SingUpNavbar.click();
  }

  async SignInNavbarClick(){
    await this.SignInNavbar.click();
  }

  async memebershipNavbarClick(){
    await this.memebershipNavbar.click();
  }

  async cardGapClick(){
    await this.cardGap.click();
  }

  async membershipCardClassicClick(){
    await this.membershipCardClassic.click();
  }

  async optionSelectBlackClick(){
    await this.optionSelectBlack.click();
  }

  async optionSelectClassicClick(){
    await this.optionSelectClassic.click();
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

  async signIn(emailSingIn, passwordSignIn){
    await this.inputSignInEmail.setValue(emailSingIn);
    await this.inputSignInPassword.setValue(passwordSignIn);
  }

  async editFormMember(newPhone, newCity){
    await this.inputEditPhone.setValue(newPhone);
    await this.inputEditCity.setValue(newCity);
  }

}

module.exports = new SignUpMember();