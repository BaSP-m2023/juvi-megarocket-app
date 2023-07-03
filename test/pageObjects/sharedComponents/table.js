class TableShared {

  get ListOfTrainers() {
    return $('[data-testid ="admin-trainers-table"]');
  }

  get editButton (){
    return $('[data-testid="admin-trainers-table"] tbody tr td:nth-child(9) div:nth-child(1) button:nth-child(1)');
  }

  get deleteButton (){
    return $('[data-testid="admin-trainers-table"] tbody tr td:nth-child(10) div:nth-child(1) button:nth-child(1)');
  }

  async editButtonClick (){
    await this.editButton.click();
  }

  async deleteButtonClick (){
    await this.deleteButton.click();
  }

}

module.exports = new TableShared();