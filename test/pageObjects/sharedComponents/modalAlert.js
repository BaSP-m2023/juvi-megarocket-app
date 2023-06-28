class ModalAlert {

  get alertError(){
    return $('');
  }

  get alertSucces(){
    return $('[data-testid="admin-trainers-modal-alert"]');
  }


  get confirmButton (){
    return $('[data-testid="admin-trainers-modal-alert"] button')
  }

  get confirmAlertDelete(){
    return $('[data-testid="admin-trainers-modal-alert"]');
  }

  async confirmButtonClick(){
    await this.confirmButton.click();
  }
}

module.exports = new ModalAlert();