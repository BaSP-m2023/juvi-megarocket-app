class ModalConfirm {
  get modalTitle() {
    return $('[data-testid="modal-confirm"] h2');
  }
  get confirmMsg() {
    return $('[data-testid="modal-confirm"] p');
  }
  get confirmButton() {
    return $('[data-testid="modal-confirm"] button:nth-child(1)');
  }
  get cancelButton() {
    return $('[data-testid="modal-confirm"] div:nth-child(2) button:nth-child(1)');
  }
  async confirmButtonClick() {
    await this.confirmButton.click();
  }
  async cancelButtonClick() {
    await this.cancelButton.click();
  }
}

module.exports = new ModalConfirm();
