const ClassesTable = require('../../test/pageObjects/admin/classes/classesTable.js');
const ClassesForm = require('../../test/pageObjects/admin/classes/classesForm.js');
const ModalAlertConfirm = require('../../test/pageObjects/sharedComponents/modalAlert.js');
const ModalConfirm = require('../../test/pageObjects/sharedComponents/modalConfirm.js');

describe('Classes feature from Admin', () => {
  beforeAll('Open browser', () => {
    browser.setWindowSize(1440, 1024);
    browser.url('http://localhost:3000/admins/classes');
  });

  it('Check correct load of page classes', async () => {
    await expect(ClassesTable.titlePage).toBeDisplayed();
    await expect(ClassesTable.titlePage).toHaveTextContaining('Classes');
    await expect(ClassesTable.addClassButton).toBeDisplayed();
    await expect(ClassesTable.classesTableContent).toBeDisplayed();
    await ClassesTable.addClassButtonClick();
  });

  it('Redirect to classes form page and add class', async () => {
    await expect(ClassesForm.classForm).toBeDisplayed();
    await expect(ClassesForm.confirmClassButton).toBeDisplayed();
    await expect(ClassesForm.cancelClassButton).toBeDisplayed();
    await expect(ClassesForm.activitySelect).toBeDisplayed();
    await expect(ClassesForm.trainerSelect).toBeDisplayed();
    await expect(ClassesForm.dayInput).toBeDisplayed();
    await expect(ClassesForm.hoursInput).toBeDisplayed();
    await expect(ClassesForm.slotsInput).toBeDisplayed();
    await ClassesForm.activitySelectClick();
    await expect(ClassesForm.activityFirstSelection).toBeDisplayed();
    await ClassesForm.activityFirstSelectionClick();
    await ClassesForm.trainerSelectClick();
    await expect(ClassesForm.trainerFirstSelection).toBeDisplayed();
    await ClassesForm.trainerFirstSelectionClick();
    await ClassesForm.classInfo('Monday', '10:00', '7');
    await ClassesForm.confirmClassButtonClick();
  });

  it('Confirm add class in modal', async () => {
    await expect(ModalAlertConfirm.confirmMsg).toBeDisplayed();
    await expect(ModalAlertConfirm.confirmButton).toBeDisplayed();
    await expect(ModalAlertConfirm.confirmMsg).toHaveTextContaining('Class created correctly!');
    await ModalAlertConfirm.confirmButtonClick();
  });

  it('Redirection to class page and press edit', async () => {
    await expect(ClassesTable.titlePage).toBeDisplayed();
    await expect(ClassesTable.titlePage).toHaveTextContaining('Classes');
    await expect(ClassesTable.classesTableContent).toBeDisplayed();
    await expect(ClassesTable.editClassButton).toBeDisplayed();
    await ClassesTable.editClassButtonClick();
  });

  it('Redirect to classes form page and edit class', async () => {
    await expect(ClassesForm.classForm).toBeDisplayed();
    await expect(ClassesForm.confirmClassButton).toBeDisplayed();
    await expect(ClassesForm.cancelClassButton).toBeDisplayed();
    await expect(ClassesForm.activitySelect).toBeDisplayed();
    await expect(ClassesForm.trainerSelect).toBeDisplayed();
    await expect(ClassesForm.dayInput).toBeDisplayed();
    await expect(ClassesForm.hoursInput).toBeDisplayed();
    await expect(ClassesForm.slotsInput).toBeDisplayed();
    await ClassesForm.classInfo('Tuesday', '11:00', '10');
    await ClassesForm.confirmClassButtonClick();
  });

  it('Confirm edit class in modal', async () => {
    await expect(ModalAlertConfirm.confirmMsg).toBeDisplayed();
    await expect(ModalAlertConfirm.confirmButton).toBeDisplayed();
    await expect(ModalAlertConfirm.confirmMsg).toHaveTextContaining('Class updated correctly!');
    await ModalAlertConfirm.confirmButtonClick();
  });

  it('Redirection to class page and press delete', async () => {
    await expect(ClassesTable.titlePage).toBeDisplayed();
    await expect(ClassesTable.titlePage).toHaveTextContaining('Classes');
    await expect(ClassesTable.classesTableContent).toBeDisplayed();
    await expect(ClassesTable.deleteClassButton).toBeDisplayed();
    await ClassesTable.deleteClassButtonClick();
  });

  it('Confirm delete class in modal', async () => {
    await expect(ModalConfirm.confirmMsg).toBeDisplayed();
    await expect(ModalConfirm.confirmButton).toBeDisplayed();
    await expect(ModalConfirm.cancelButton).toBeDisplayed();
    await expect(ModalConfirm.confirmMsg).toHaveTextContaining(
      'Are you sure you want to delete this item?'
    );
    await ModalConfirm.confirmButtonClick();
  });
});
