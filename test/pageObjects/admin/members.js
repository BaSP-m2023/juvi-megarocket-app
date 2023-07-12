class MembersEditDelete {
  get membersBtn() {
    return $(`[data-testid="navbar"] li:nth-child(3) a`)
  }

  get membersTitle() {
    return $(`[data-testid="admin-members-section"] h2`)
  }

  get membersTable() {
      return $(`[data-testid="admin-members-table"]`)
  }

  get firstMemberEditBtn() {
      return $(`[data-testid="admin-members-table"] tbody tr:first-child td:nth-child(10) a`)
  }

  get firstMemberName() {
    return $(`[data-testid="admin-members-table"] tbody tr:first-child td:nth-child(1)`)
  }

  get firstMemberDeleteBtn() {
      return $(`[data-testid="admin-members-table"] tbody tr:first-child td:nth-child(11) button`)
  }

  get formEditMemberTitle() {
      return $(`[data-testid="admin-members-add-form"] h1`)
  }

  get nameLabelEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(2) label`)
  }

  get nameInputEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(2) input`)
  }

  get lastNameLabelEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(3) label`)
  }

  get lastNameInputEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(3) input`)
  }

  get dniLabelEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(4) label`)
  }

  get dniInputEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(4) input`)
  }

  get phoneLabelEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(5) label`)
  }

  get phoneInputEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(5) input`)
  }

  get emailLabelEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(6) label`)
  }

  get emailInputEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(6) input`)
  }

  get cityLabelEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(7) label`)
  }

  get cityInputEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(7) input`)
  }

  get birthDateLabelEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(8) label`)
  }

  get birthDateInputEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(8) input`)
  }

  get zipLabelEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(9) label`)
  }

  get zipInputEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(9) input`)
  }

  get passwordLabelEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(10) label`)
  }

  get passwordInputEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(10) input`)
  }

  get showHidePasswordBtn() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(10) svg`)
  }

  get membershipLabelEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(11) label`)
  }

  get membershipInputEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(11) select`)
  }

  get inputsErrorMessages() {
    return $(`p.input_errorMessage__Pjt5Q`)
  }

  get modalConfirmDelete() {
      return $(`[data-testid="modal-confirm"]`)
  }

  async membersBtnClick() {
    await this.membersBtn.click();
  }

  async firstMemberEditBtnClick() {
      await this.firstMemberEditBtn.click();
  }

  async updateFillForm() {
    function generateRandomEmail() {
      const randomString = Math.random().toString(36).substring(2, 10);
      const email = `test-${randomString}@automation.com`;

      return email;
    }

    const randomEmail = generateRandomEmail();

    await this.nameInputEditMembers.setValue('Automation');
    await this.lastNameInputEditMembers.setValue('Testing');
    await this.dniInputEditMembers.setValue('98765432');
    await this.phoneInputEditMembers.setValue('9087654321');
    await this.emailInputEditMembers.setValue(randomEmail);
    await this.cityInputEditMembers.setValue('Testland');
    await this.birthDateInputEditMembers.setValue('07101999');
    await this.zipInputEditMembers.setValue('9999');
    await this.passwordInputEditMembers.setValue('CheckVisibility');
    await this.membershipInputEditMembers.selectByAttribute('value', 'Black');
  }

  async showHidePasswordBtnClick() {
    await this.showHidePasswordBtn.click();
  }

  async firstMemberDeleteBtnClick() {
      await this.firstMemberDeleteBtn.click();
  }

  async membersTitleText() {
      return await this.membersTitle.getText();
  }

  async firstMemberNameText() {
    return await this.firstMemberName.getText();
  }

};



module.exports = new MembersEditDelete();