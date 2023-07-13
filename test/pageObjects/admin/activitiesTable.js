class ActivitiesTable {
  get activityTableTitle() {
    return $('[data-testid="admin-activities-section"] h2');
  }
  get newActivityName() {
    return $('[data-testid="admin-activities-table"] tbody tr:last-child td:first-child');
  }
  get newActivityDescription() {
    return $('[data-testid="admin-activities-table"] tbody tr:last-child td:nth-child(2)');
  }
  get newActivityEditBtn() {
    return $('[data-testid="admin-activities-table"] tbody tr:last-child td:nth-child(3) button');
  }
  get newActivityDeleteBtn() {
    return $('[data-testid="admin-activities-table"] tbody tr:last-child td:nth-child(4) button');
  }
  async editBtnClick() {
    await this.newActivityEditBtn.click();
  }
  async deleteBtnClick() {
    await this.newActivityDeleteBtn.click();
  }

}

module.exports = new ActivitiesTable();
