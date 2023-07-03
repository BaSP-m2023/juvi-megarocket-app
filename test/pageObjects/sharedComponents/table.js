class TableShared {

  get ListOfTrainers() {
    return $('[data-testid ="admin-trainers-table"]');
  }

  get editButton (){
    return $('[data-testid="admin-members-table"] > tbody > tr:nth-child(1) > td.table_edit__Oa\+9K > a > div > button');
  }

  get deleteButton (){
    return $('[data-testid="admin-members-table"] > tbody > tr:nth-child(1) > td.table_delete__ncQN4 > div > button');
  }

  async editButtonClick (){
    await this.editButton.click();
  }

  async deleteButtonClick (){
    await this.deleteButton.click();
  }

}

module.exports = new TableShared();