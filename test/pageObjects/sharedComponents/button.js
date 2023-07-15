/* eslint-disable no-undef */
class Buttons {
  get confirmBtn() {
    return $('[data-testid="confirm-button"]');
  }
  get cancelBtn() {
    return $('[data-testid="cancel-button"]');
  }
  get resetBtn() {
    return $('[data-testid="reset-button"]');
  }
  get submitBtn() {
    return $('[data-testid="submit-button"]')
  }
  get addBtn() {
    return $('[data-testid="add-button"]');
  }
  get logoutButton() {
    return $('[data-testid="logout-button"]');
  }
  get signInButton(){
    return $('[data-testid="signin-form"] button');
  }
  async confirmBtnClick() {
    await this.confirmBtn.click();
  }
  async cancelBtnClick() {
    await this.cancelBtn.click();
  }
  async resetBtnClick() {
    await this.resetBtn.click();
  }
  async addBtnClick() {
    await this.addBtn.click();
  }
  async submitBtnClick() {
    await this.submitBtn.click();
  }
  async logoutBtnClick() {
    await this.logoutButton.click();
  }
  async signInButtonClick(){
    await this.signInButton.click();
  }
}

module.exports = new Buttons();
