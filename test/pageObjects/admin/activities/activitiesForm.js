class ActivitiesForm {
  get nameLabel() {
    return $('[data-testid="admin-activities-add-form"] div:nth-child(1) label');
  }
  get nameInput() {
    return $('[data-testid="admin-activities-add-form"] div:nth-child(1) input');
  }
  get descriptionLabel() {
    return $('[data-testid="admin-activities-add-form"] div:nth-child(2) label');
  }
  get descriptionInput() {
    return $('[data-testid="admin-activities-add-form"] div:nth-child(2) input');
  }
  async fillForm(name, description) {
    await this.nameInput.setValue(name)
    await this.descriptionInput.setValue(description)
  }
}

module.exports = new ActivitiesForm();