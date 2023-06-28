/* eslint-disable no-undef */
class Button {
  get addButton() {
    return $('[data-testid] button');
  }
  get confirmEditButton() {
    return $('[data-testid="admin-trainers-confirm-button"]');
  }

  get confirmModalSuccesButton() {
    return $('[data-testid="admin-trainers-modal-alert"] button');
  }

  get confirmDeleteButton() {
    return $('[data-testid="modal-confirm"] button');
  }

  get newconfirmDeleteButton() {
    return $('[data-testid="admin-trainers-modal-alert"] button');
  }

  async addButtonClick() {
    await this.addButton.click();
  }

  async confirmEditButtonClick() {
    await this.confirmEditButton.click();
  }

  async confirmModalSuccesButtonClick() {
    await this.confirmModalSuccesButton.click();
  }

  async confirmDeleteButtonClick() {
    await this.confirmDeleteButton.click();
  }

  async newconfirmDeleteButtonClick() {
    await this.newconfirmDeleteButton.click();
  }
}

module.exports = new Button();
