class ActivitiesForm {
  get nameLabel() {
    return $('[data-testid="admin-activities-add-form"] div:nth-child(1) label');
  }
  get nameInput() {
    return $('[data-testid="admin-activities-add-form"] div:nth-child(1) input');
  }
  get descriptionLabel() {
    return $('[data-testid="admin-activities-add-form"] div:nth-child(2) label');
  }
  get descriptionInput() {
    return $('[data-testid="admin-activities-add-form"] div:nth-child(2) input');
  }
  get confirmBtn() {
    return $('[data-testid="admin-activities-confirm-button"]');
  }
  get cancelBtn() {
    return $('[data-testid="admin-activities-cancel-button"]');
  }
  get resetBtn() {
    return $('[data-testid="admin-activities-reset-button"]');
  }
  get modalAlertText() {
    return $('[data-testid="admin-activities-modal-alert"] p')
  }
  get modalAlertButton() {
    return $('[data-testid="admin-activities-modal-alert"] button')
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
  async fillForm(name, description) {
    await this.nameInput.setValue(name)
    await this.descriptionInput.setValue(description)
  }
  async confirmAlertClick() {
    await this.modalAlertButton.click();
  }
}

module.exports = new ActivitiesForm();