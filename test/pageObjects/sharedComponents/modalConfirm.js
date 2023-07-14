class ModalConfirm {
  get confirmationText(){
    return $('[data-testid="modal-confirm"]');
  }
  get confirmModalBtn() {
    return $('[data-testid="modal-confirm"] button:nth-child(1)');
  }
  get cancelModalBtn() {
    return $('[data-testid="modal-confirm"] div:nth-child(2) button:nth-child(1)')
  }
  async confirmMessage() {
    return await this.confirmationText.getText();
  }
  async cancelClick() {
    await this.cancelModalBtn.click();
  }
  async confirmClick() {
    await this.confirmModalBtn.click();
  }
}

module.exports = new ModalConfirm();