class TableShared {

  get ListOfTrainers() {
    return $('[data-testid = "admin-trainers-table"]');
  }

  get editButton (){
    return $('[data-testid=admin-trainers-table] td:nth-child(9) button');
  }

  get deleteButton (){
    return $('[data-testid=admin-trainers-table] td:nth-child(10) button');
  }

  async editButtonClick (){
    await this.editButton.click();
  }

  async deleteButtonClick (){
    await this.deleteButton.click();
  }

}

module.exports = new TableShared();