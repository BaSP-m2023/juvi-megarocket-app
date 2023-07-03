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

  get modalALertAddMember(){
    return $('[data-testid=member-signup-modal-alert]');
  }

  get buttonAddCofirmMember(){
    return $('[data-testid=member-signup-modal-alert] div button');
  }

  async confirmButtonClick(){
    await this.confirmButton.click();
  }

  async buttonAddCofirmMemberClick(){
    await this.buttonAddCofirmMember.click();
  }
}

module.exports = new ModalAlert();