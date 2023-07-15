class EditProfile {

  get inputEditName(){
    return $('[data-testid="member-profile-edit-form"] fieldset:nth-child(2) input');
  }

  get inputEditLastName(){
    return $('[data-testid="member-profile-edit-form"] fieldset:nth-child(3) input');
  }

  get inputEditDni(){
    return $('[data-testid="member-profile-edit-form"] fieldset:nth-child(4) input');
  }

  get inputEditPhone(){
    return $('[data-testid="member-profile-edit-form"] fieldset:nth-child(5) input');
  }

  get inputEditEmail(){
    return $('[data-testid="member-profile-edit-form"] fieldset:nth-child(6) input');
  }

  get inputEditCity(){
    return $('[data-testid="member-profile-edit-form"] fieldset:nth-child(7) input');
  }

  get inputEditBday(){
    return $('[data-testid="member-profile-edit-form"] fieldset:nth-child(8) input');
  }

  get inputEditZip(){
    return $('[data-testid="member-profile-edit-form"] fieldset:nth-child(9) input');
  }

  get inputEditPassword(){
    return $('[data-testid="member-profile-edit-form"] fieldset:nth-child(10) input');
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

  async editFormMember(newPhone, newCity){
    await this.inputEditPhone.setValue(newPhone);
    await this.inputEditCity.setValue(newCity);
  }

  async optionSelectClassicClick(){
    await this.optionSelectClassic.click();
  }
}

module.exports = new EditProfile();