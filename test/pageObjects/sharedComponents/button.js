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
  get addActivityBtn() {
    return $('[data-testid="add-button"]');
  }
  get logoutButton() {
    return $('[data-testid="logout-button"]');
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
    await this.addActivityBtn.click();
  }
  async submitBtnClick() {
    await this.submitBtn.click();
  }
  async logoutBtnClick() {
    await this.logoutButton.click();
  }
}

