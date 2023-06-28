class ClassesTable {
  get titlePage() {
    return $('[data-testid="admin-classes-section"] h2');
  }
  get addClassButton() {
    return $('[data-testid="admin-classes-add-button"]');
  }
  get classesTableContent() {
    return $('[data-testid="admin-classes-table"]');
  }
  get editClassButton() {
    return $('[data-testid="admin-classes-table"] tbody tr:last-child td:nth-child(6) button');
  }
  get deleteClassButton() {
    return $('[data-testid="admin-classes-table"] tbody tr:last-child td:nth-child(7) button');
  }
  async addClassButtonClick() {
    await this.addClassButton.click();
  }
  async editClassButtonClick() {
    await this.editClassButton.click();
  }
  async deleteClassButtonClick() {
    await this.deleteClassButton.click();
  }
}

module.exports = new ClassesTable();
