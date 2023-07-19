class ClassesPage {
get classesBtn() {
  return $(`[data-testid="navbar"] li:last-child a`)
}

get classesTitle() {
  return $(`[data-testid="admin-classes-section"] h2`)
}

get classesTable() {
  return $(`[data-testid="admin-classes-table"]`)
}

get classesTbody() {
  return $('[data-testid="admin-classes-table"] tbody');
}

get lastClassesEditBtn() {
  return $(`[data-testid="admin-classes-table"] tbody tr:last-child td:nth-child(6) a`)
}

get lastClassSlots() {
  return $(`[data-testid="admin-classes-table"] tbody tr:last-child td:nth-child(5)`)
}

get lastClasesDeleteBtn() {
  return $(`[data-testid="admin-classes-table"] tbody tr:last-child td:nth-child(7) button`)
}

get activityInputAddClasses() {
  return $('[data-testid="admin-classes-add-form"] div:nth-child(1) option:last-child')
}

get trainerInputAddClasses() {
  return $(`[data-testid="admin-classes-add-form"] div:nth-child(2) option:last-child`)
}

get hourInputAddClasses() {
  return $(`[data-testid="admin-classes-add-form"] div:nth-child(4) option:last-child`)
}

get dayInputAddClasses() {
  return $(`[data-testid="admin-classes-add-form"] div:nth-child(3) option:nth-child(4)`)
}

get activityInputEditClasses() {
  return $(`[data-testid="admin-classes-add-form"] div:nth-child(1) option:nth-child(4)`)
}

get trainerInputEditClasses() {
  return $(`[data-testid="admin-classes-add-form"] div:nth-child(2) option:nth-child(4)`)
}

get dayInputEditClasses() {
  return $(`[data-testid="admin-classes-add-form"] div:nth-child(3) option:nth-child(7)`)
}

get hourInputEditClasses() {
  return $(`[data-testid="admin-classes-add-form"] div:nth-child(4) option:nth-child(6)`)
}

get slotsInputEditClasses() {
  return $(`[data-testid="admin-classes-add-form"] div:nth-child(5) input`)
}

async classesBtnClick() {
  await this.classesBtn.click();
}

async classesTitleText() {
  return await this.classesTitle.getText();
}

async lastClassesEditBtnClick() {
  await this.lastClassesEditBtn.click();
}

async lastClasesDeleteBtnClick() {
  await this.lastClasesDeleteBtn.click();
}

async lastClassSlotsText() {
  return await this.lastClassSlots.getText();
}

async fillClassesAddForm() {
  await this.activityInputAddClasses.click();
  await this.trainerInputAddClasses.click();
  await this.dayInputEditClasses.click();
  await this.hourInputAddClasses.click();
  await this.slotsInputEditClasses.setValue('5');
}

async fillClassesEditForm() {
  await this.activityInputEditClasses.click();
  await this.trainerInputEditClasses.click();
  await this.dayInputEditClasses.click();
  await this.hourInputEditClasses.click();
  await this.slotsInputEditClasses.setValue('10');
}

async getNumberOfClasses() {
  const rows = await this.classesTbody.$$('tr');
  return rows.length;
}

}

module.exports = new ClassesPage();
