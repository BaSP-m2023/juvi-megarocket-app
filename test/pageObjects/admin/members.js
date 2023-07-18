class MembersEditDelete {
  get membersBtn() {
    return $(`[data-testid="navbar"] li:nth-child(4) a`)
  }

  get membersTitle() {
    return $(`[data-testid="admin-members-section"] h2`)
  }

  get membersTable() {
      return $(`[data-testid="admin-members-table"]`)
  }

  get lastMemberEditBtn() {
      return $(`[data-testid="admin-members-table"] tbody tr:last-child td:nth-child(10) a`)
  }

  get lastMemberName() {
    return $(`[data-testid="admin-members-table"] tbody tr:last-child td:nth-child(1)`)
  }

  get lastMemberDeleteBtn() {
      return $(`[data-testid="admin-members-table"] tbody tr:last-child td:nth-child(11) button`)
  }

  get formEditMemberTitle() {
      return $(`[data-testid="admin-members-add-form"] h1`)
  }

  get nameInputEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(2) input`)
  }

  get lastNameInputEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(3) input`)
  }

  get dniInputEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(4) input`)
  }

  get phoneInputEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(5) input`)
  }

  get emailInputEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(6) input`)
  }

  get cityInputEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(7) input`)
  }

  get birthDateInputEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(8) input`)
  }

  get zipInputEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(9) input`)
  }

  get passwordInputEditMembers() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(10) input`)
  }

  get showHidePasswordBtn() {
      return $(`[data-testid="admin-members-add-form"] fieldset:nth-child(10) svg`)
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

  async lastMemberEditBtnClick() {
      await this.lastMemberEditBtn.click();
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

  async lastMemberDeleteBtnClick() {
      await this.lastMemberDeleteBtn.click();
  }

  async membersTitleText() {
      return await this.membersTitle.getText();
  }

  async lastMemberNameText() {
    return await this.lastMemberName.getText();
  }

};



module.exports = new MembersEditDelete();
