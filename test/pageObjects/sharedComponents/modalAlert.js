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
}

module.exports = new ModalAlert();