class ModalAlertConfirm {
  get confirmMsg() {
    return $('[data-testid="admin-classes-modal-alert"] p');
  }
  get confirmButton() {
    return $('[data-testid="admin-classes-modal-alert"] button:nth-child(1)');
  }
  async confirmButtonClick() {
    await this.confirmButton.click();
  }
}

module.exports = new ModalAlertConfirm();
