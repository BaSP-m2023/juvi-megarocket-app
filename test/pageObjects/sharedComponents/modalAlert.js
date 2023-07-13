class ModalAlert {

  get alertSucces(){
    return $('[data-testid="admin-trainers-modal-alert"]');
  }

  get confirmButtonModal (){
    return $('[data-testid="admin-trainers-modal-alert"] button')
  }

  get confirmAlertDelete(){
    return $('[data-testid="admin-trainers-modal-alert"]');
  }

  get modalAlert(){
    return $('[data-testid="modal-alert"] p')
  }

  get modalAlertButton(){
    return $('[data-testid="modal-alert"] button')
  }

  async modalAlertButtonClick(){
    await this.modalAlertButton.click();
  }

  async confirmButtonModalClick(){
    await this.confirmButton.click();
  }

}

module.exports = new ModalAlert();