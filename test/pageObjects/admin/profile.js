class Profile {

  get profileNavbar() {
    return $('[data-testid="navbar"] li:nth-child(3) a');
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

  get inputPassword() {
    return $('[data-testid="admin-profile-form"] fieldset:nth-child(8) input:nth-child(2)');
  }

  get path (){
    return $('#root > div > div > div > div > form > div:nth-child(1) > fieldset:nth-child(8) > div > svg > path');
  }

  async profileForm(name, lastname, dni, phone, email, city, password) {
    await this.inputName.setValue(name);
    await this.inputLastName.setValue(lastname);
    await this.inputDni.setValue(dni);
    await this.inputPhone.setValue(phone);
    await this.inputEmail.setValue(email);
    await this.inputCity.setValue(city);
    await this.inputPassword.setValue(password);
  }

  async profileNavbarClick(){
    await this.profileNavbar.click();
  }

  async pathClick(){
    await this.path.click();
  }

}
module.exports = new Profile();