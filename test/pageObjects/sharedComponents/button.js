/* eslint-disable no-undef */
class Button {
  get addButton() {
    return $('[data-testid="add-button"]');
  }
  get confirmButton() {
    return $('[data-testid="confirm-button"]');
  }

  get confirmDeleteButton() {
    return $('[data-testid="confirm-button"]');
  }

  get submitButton(){
    return $('[data-testid="submit-button"]');
  }

  get cancelButton(){
    return $('[data-testid="cancel-button"]');
  }

  get profileMemberNavbar(){
    return $('[data-testid="navbar"] li:nth-child(3) a');
  }

  get logOutButton(){
    return $('[data-testid="logout-button"]')
  }

  get signInButton(){
    return $('[data-testid="signin-form"] button');
  }

  async addButtonClick() {
    await this.addButton.click();
  }

  async confirmButtonClick() {
    await this.confirmButton.click();
  }

  async confirmDeleteButtonClick() {
    await this.confirmDeleteButton.click();
  }

  async submitButtonClick() {
    await this.submitButton.click();
  }

  async cancelButtonClick(){
    await this.cancelMemberButton.click();
  }

  async profileMemberNavbarClick(){
    await this.profileMemberNavbar.click();
  }

  async logOutButtonClick(){
    await this.logOutButton.click();
  }

  async signInButtonClick(){
    await this.signInButton.click();
  }
}

module.exports = new Button();
