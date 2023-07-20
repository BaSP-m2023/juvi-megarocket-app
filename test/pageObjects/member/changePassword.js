class ChangePassword {
  get passwordTittle() {
    return $('#root > div > div > div > div > form > h1');
  }
  get newPass() {
    return $('#root > div > div > div > div > form > fieldset > div.input_container__FCOUN > input');
  }
  get secondNewPass() {
    return $('#root > div > div > div > div > form > fieldset > div:nth-child(2) > div > input');
  }
  get submitBtn() {
    return $('[data-testid="submit-button"]');
  }
  get confirmBtn() {
    return $('[data-testid="modal-alert"] button');
  }
  async fillPasswords (pass1, pass2) {
    await this.newPass.setValue(pass1);
    await this.secondNewPass.setValue(pass2);
  }
  async submitClick() {
    await this.submitBtn.click();
  }
  async confirmClick() {
    await this.confirmBtn.click();
  }
}

module.exports = new ChangePassword();