class ModalConfirm {
  get confirmationTitle() {
    return $('[data-testid="modal-confirm"] h2');
  }
  get confirmationText() {
    return $('[data-testid="modal-confirm"] p');
  }
  get confirmModalBtn() {
    return $('[data-testid="modal-confirm"] button');
  }
  get cancelModalBtn() {
    return $('[data-testid="modal-confirm"] div:nth-child(2) button:nth-child(1)')
  }
  async confirmClick() {
    await this.confirmModalBtn.click();
  }
  async cancelClick() {
    await this.cancelModalBtn.click();
  }
  async confirmMessage() {
    return await this.confirmationText.getText();
  }
}

module.exports = new ModalConfirm();
