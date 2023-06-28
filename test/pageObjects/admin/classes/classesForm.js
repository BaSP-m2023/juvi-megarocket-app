class ClassesForm {
  get classForm() {
    return $('[data-testid="admin-classes-add-form"]');
  }
  get confirmClassButton() {
    return $('[data-testid="admin-classes-confirm-button"]');
  }
  get cancelClassButton() {
    return $('[data-testid="admin-classes-cancel-button"]');
  }
  get activitySelect() {
    return $('[data-testid="admin-classes-add-form"] div:nth-child(1) select');
  }
  get activityFirstSelection() {
    return $('[data-testid="admin-classes-add-form"] div:nth-child(1) option:nth-child(3)');
  }
  get trainerSelect() {
    return $('[data-testid="admin-classes-add-form"] div:nth-child(2) select');
  }
  get trainerFirstSelection() {
    return $('[data-testid="admin-classes-add-form"] div:nth-child(2) option:nth-child(3)');
  }
  get dayInput() {
    return $('#root > div > div > div > form > div:nth-child(1) > div:nth-child(3) > div > input');
  }
  get hoursInput() {
    return $('#root > div > div > div > form > div:nth-child(1) > div:nth-child(4) > div > input');
  }
  get slotsInput() {
    return $('#root > div > div > div > form > div:nth-child(1) > div:nth-child(5) > div > input');
  }
  async activitySelectClick() {
    await this.activitySelect.click();
  }
  async activityFirstSelectionClick() {
    await this.activityFirstSelection.click();
  }
  async trainerSelectClick() {
    await this.trainerSelect.click();
  }
  async trainerFirstSelectionClick() {
    await this.trainerFirstSelection.click();
  }
  async classInfo(day, hours, slots) {
    await this.dayInput.setValue(day);
    await this.hoursInput.setValue(hours);
    await this.slotsInput.setValue(slots);
  }
  async confirmClassButtonClick() {
    await this.confirmClassButton.click();
  }
  async cancelClassButtonClick() {
    await this.cancelClassButton.click();
  }
}

module.exports = new ClassesForm();
