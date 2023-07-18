class ModalAlert {
  get modalAlertText() {
    return $('[data-testid="modal-alert"] p')
  }
  get modalAlertButton() {
    return $('[data-testid="modal-alert"] button')
  }
  async confirmAlertClick() {
    await this.modalAlertButton.click();
  }
  async modalAlertMessage() {
    return await this.modalAlertText.getText();
  }
}

module.exports = new ModalAlert();
