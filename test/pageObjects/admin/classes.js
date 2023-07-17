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

get activityInputEditClasses() {
  return $(`[data-testid="admin-classes-add-form"] div:nth-child(1) select`)
}

get trainerInputEditClasses() {
  return $(`[data-testid="admin-classes-add-form"] div:nth-child(2) select`)
}

get dayInputEditClasses() {
  return $(`[data-testid="admin-classes-add-form"] div:nth-child(3) input`)
}

get hourInputEditClasses() {
  return $(`[data-testid="admin-classes-add-form"] div:nth-child(4) select`)
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
  const activityCount = await this.activityInputEditClasses.$$('option').length;
  await this.activityInputEditClasses.selectByIndex(activityCount - 1);

  const trainerCount = await this.trainerInputEditClasses.$$('option').length;
  await this.trainerInputEditClasses.selectByIndex(trainerCount - 1);

  await this.dayInputEditClasses.setValue('Friday');
  const hourCount = await this.hourInputEditClasses.$$('option').length;
  await this.hourInputEditClasses.selectByIndex(hourCount - 1);
  await this.slotsInputEditClasses.setValue('5');
}

async fillClassesEditForm() {
  await this.activityInputEditClasses.waitForClickable({ timeout: 5000 });
  await this.activityInputEditClasses.selectByIndex(1);
  await this.trainerInputEditClasses.waitForClickable({ timeout: 5000 });
  await this.trainerInputEditClasses.selectByIndex(1);
  await this.dayInputEditClasses.setValue('Tuesday');
  await this.hourInputEditClasses.waitForClickable({ timeout: 5000 });
  await this.hourInputEditClasses.selectByIndex(1);
  await this.slotsInputEditClasses.setValue('10');
}

async getNumberOfClasses() {
  const rows = await this.classesTbody.$$('tr');
  return rows.length;
}

}

module.exports = new ClassesPage();
