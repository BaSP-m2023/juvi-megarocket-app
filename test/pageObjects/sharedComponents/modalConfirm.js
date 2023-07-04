class ModalConfirm {

  get modalConfirmDelete(){
    return $('[data-testid="modal-confirm"]');
  }

}

module.exports = new ModalConfirm();