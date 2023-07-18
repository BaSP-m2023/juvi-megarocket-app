class AdminsCRUD {
  get adminsBtn() {
    return $(`[data-testid="navbar"] li:last-child a`)
  }

  get adminTitle() {
    return $(`[data-testid="sa-admin-section"] h2`)
  }

  get adminTable() {
    return $(`[data-testid="superadmin-admin-table"]`)
  }

  get adminTbody() {
    return $(`[data-testid="superadmin-admin-table"] Tbody`)
  }

  get lastAdminEditBtn() {
    return $(`[data-testid="superadmin-admin-table"] tbody tr:last-child a`)
  }

  get lastAdminName() {
    return $(`[data-testid="superadmin-admin-table"] tbody tr:last-child td:nth-child(1)`)
  }

  get lastAdminDeleteBtn() {
    return $(`[data-testid="superadmin-admin-table"] tbody tr:last-child button`)
  }

  get firstNameInput(){
    return $(`[data-testid="admin-form"] > div:nth-child(1) > fieldset:nth-child(2) > div > input`)
  }

  get lastNameInput(){
    return $(`[data-testid="admin-form"] fieldset:nth-child(3) input`)
  }

  get dniInput(){
    return $(`[data-testid="admin-form"] fieldset:nth-child(4) input`)
  }

  get phoneInput(){
    return $(`[data-testid="admin-form"] fieldset:nth-child(5) input`)
  }

  get emailInput(){
    return $(`[data-testid="admin-form"] fieldset:nth-child(6) input`)
  }

  get cityInput(){
    return $(`[data-testid="admin-form"] fieldset:nth-child(7) input`)
  }

  get passwordInput(){
    return $(`[data-testid="admin-form"] fieldset:nth-child(8) input`)
  }

  async adminsBtnClick() {
    await this.adminsBtn.click();
  }

  async adminTitleText() {
    return await this.adminTitle.getText();
  }

  async lastAdminEditBtnClick() {
    await this.lastAdminEditBtn.click();
  }

  async lastAdminDeleteBtnClick() {
    await this.lastAdminDeleteBtn.click();
  }

  async lastAdminNameText() {
    return await this.lastAdminName.getText();
  }

  async fillFormAddAdmin(){
    function generateRandomEmail() {
      const randomString = Math.random().toString(36).substring(2, 10);
      const email = `test-add-${randomString}@automation.com`;

      return email;
    }

    const randomEmail = generateRandomEmail();

    function generateRandomDni() {
      const min = 1000000;
      const max = 99999999;
      const randomDni = Math.floor(Math.random() * (max - min + 1)) + min;
      return randomDni.toString();
    }

    const randomDniString = generateRandomDni();

    function generateRandomPhone() {
      const min = 1000000000;
      const max = 9999999999;
      const randomPhone = Math.floor(Math.random() * (max - min + 1)) + min;
      return randomPhone.toString();
    }

    const randomPhoneString = generateRandomPhone();

    await this.firstNameInput.setValue('Micaela');
    await this.lastNameInput.setValue('Rossi');
    await this.dniInput.setValue(randomDniString);
    await this.phoneInput.setValue(randomPhoneString);
    await this.emailInput.setValue(randomEmail);
    await this.cityInput.setValue('Rosario');
    await this.passwordInput.setValue('123Password');
  }

  async fillFormEditAdmin(){
    function generateRandomEmail() {
      const randomString = Math.random().toString(36).substring(2, 10);
      const email = `test-add-${randomString}@automation.com`;

      return email;
    }

    const randomEmail = generateRandomEmail();

    function generateRandomDni() {
      const min = 1000000;
      const max = 99999999;
      const randomDni = Math.floor(Math.random() * (max - min + 1)) + min;
      return randomDni.toString();
    }

    const randomDniString = generateRandomDni();

    function generateRandomPhone() {
      const min = 1000000000;
      const max = 9999999999;
      const randomPhone = Math.floor(Math.random() * (max - min + 1)) + min;
      return randomPhone.toString();
    }

    const randomPhoneString = generateRandomPhone();

    await this.firstNameInput.setValue('Edith');
    await this.lastNameInput.setValue('Smith');
    await this.dniInput.setValue(randomDniString);
    await this.phoneInput.setValue(randomPhoneString);
    await this.emailInput.setValue(randomEmail);
    await this.cityInput.setValue('New York');
    await this.passwordInput.setValue('Password123');
  }

  async getNumberOfAdmins() {
    const rows = await this.adminTbody.$$('tr');
    return rows.length;
  }

}

module.exports = new AdminsCRUD();