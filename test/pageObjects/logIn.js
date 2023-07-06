class LogIn {
  get signInBtn() {
    return $(`[data-testid="landing-navbar"]`);
  }

  get emailInput() {
    return $(`form input:first-child`);
  }

  get passwordInput() {
    return $(`form input:second-child`);
  }

  get showHidePasswordBtn() {
    return $(`form svg`);
  }

  get logInBtn() {
    return $(`form button:first-child`)
  }

  get logInCancelBtn() {
    return $(`form button:second-child`)
  }

  async showHidePasswordBtnClick() {
    await this.showHidePasswordBtn.click();
  }

  async fillFormLogInMember() {
    await this.emailInput.setValue('pablomorad@hotmail.com');
    await this.passwordInput.setValue('Chimpance1');
  }

  async logInBtnClick() {
    await this.logInBtn.click();
  }

  async logInCancelBtnClick() {
    await this.logInCancelBtn.click();
  }

  async signInBtnClick() {
    await this.signInBtn.click();
  }
}

module.exports = new LogIn();