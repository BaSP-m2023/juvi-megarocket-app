class Profile {

  get profileNavbar() {
    return $('[data-testid="navbar"] li:nth-child(3) a');
  }

  get profileSection() {
    return $(`[data-testid=profile-section]`);
  }

  get editProfileBtn() {
    return $(`[data-testid=profile-buttons-container] button:nth-child(1)`)
  }

  get changePasswordBtn() {
    return $(`[data-testid=profile-buttons-container] button:nth-child(2)`)
  }
  get profileForm() {
    return $('[data-testid="admin-profile-form"]');
  }

  get inputName() {
    return $('[data-testid="admin-profile-form"] fieldset:nth-child(2) input:nth-child(2)');
  }

  get inputLastName() {
    return $('[data-testid="admin-profile-form"] fieldset:nth-child(3) input:nth-child(2)');
  }

  get inputDni () {
    return $('[data-testid="admin-profile-form"] fieldset:nth-child(4) input:nth-child(2)');
  }

  get inputPhone() {
    return $('[data-testid="admin-profile-form"] fieldset:nth-child(5) input:nth-child(2)');
  }

  get inputEmail() {
    return $('[data-testid="admin-profile-form"] fieldset:nth-child(6) input:nth-child(2)');
  }

  get inputCity() {
    return $('[data-testid="admin-profile-form"] fieldset:nth-child(7) input:nth-child(2)');
  }

  async profileForm(name, lastname, dni, phone, email, city) {
    await this.inputName.setValue(name);
    await this.inputLastName.setValue(lastname);
    await this.inputDni.setValue(dni);
    await this.inputPhone.setValue(phone);
    await this.inputEmail.setValue(email);
    await this.inputCity.setValue(city);
  }

  async profileNavbarClick(){
    await this.profileNavbar.click();
  }

  async editProfileBtnClick() {
    await this.editProfileBtn.click();
  }

  async changePasswordBtnClick() {
    await this.changePasswordBtn.click();
  }
}
module.exports = new Profile();