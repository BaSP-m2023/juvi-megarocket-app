class TrainersPage{

  get header (){
    return $('[data-testid ="header-testid"]');
  }

  get facebookButton(){
    return $('[data-testid ="header-testid"] div a')
  }

  get twitterButton(){
    return $('[data-testid ="header-testid"] div a:nth-child(2)');
  }

  get instagramButton(){
    return $('[data-testid="header-testid"] div a:nth-child(3)');
  }

  get addTrainerForm(){
    return $('[data-testid="admin-trainers-add-form"]');
  }

  get editTrainerForm(){
    return $('[data-testid="admin-trainers-add-form"]');
  }

  get firstNameInput(){
    return $('[data-testid="admin-trainers-add-form"] div input');
  }

  get lastNameInput(){
    return $('[data-testid="admin-trainers-add-form"] div:nth-child(2) input');
  }

  get cityInput(){
    return $('[data-testid="admin-trainers-add-form"] div:nth-child(3) input');
  }

  get dniInput(){
    return $('[data-testid="admin-trainers-add-form"] div:nth-child(4) input');
  }

  get emailInput(){
    return $('#root > div > div > div > form > div:nth-child(2) > div:nth-child(1) > input');
  }

  get phoneInput(){
    return $('#root > div > div > div > form > div:nth-child(2) > div:nth-child(2) > input');
  }

  get salaryInput(){
    return $('#root > div > div > div > form > div:nth-child(2) > div:nth-child(3) > input');
  }

  get passwordInput(){
    return $('#root > div > div > div > form > div:nth-child(2) > div:nth-child(4) > input');
  }

  get confirmButton (){
    return $('[data-testid="admin-trainers-confirm-button"]');
  }

  async facebookButtonClick (){
    await this.facebookButton.click();
  }

  async twitterButtonClick (){
    await this.facebookButton.click();
  }

  async instagramButtonClick (){
    await this.facebookButton.click();
  }

  async confirmButtonClick(){
    await this.confirmButton.click();
  }

  async addTrainerForm (firstname, lastname, city, dni, email, phone, salary, password) {
    await this.firstNameInput.setValue(firstname);
    await this.lastNameInput.setValue(lastname);
    await this.cityInput.setValue(city);
    await this.dniInput.setValue(dni);
    await this.emailInput.setValue(email);
    await this.phoneInput.setValue(phone);
    await this.salaryInput.setValue(salary);
    await this.passwordInput.setValue(password);
  }

  async editTrainerForm(city, salary, password){
    await this.cityInput.setValue(city);
    await this.salaryInput.setValue(salary);
    await this.passwordInput.setValue(password);
  }

}

module.exports = new TrainersPage();