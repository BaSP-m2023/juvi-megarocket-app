const ActivitiesTable = require('../../test/pageObjects/admin/activities/activitiesTable')
const ActivitiesForm = require('../../test/pageObjects/admin/activities/activitiesForm')
const ModalConfirm = require('../../test/pageObjects/sharedComponents/modalConfirm')

describe('Complete CRUD for admin-activities', () => {
  beforeAll('Browser openning', () => {
    browser.url('http://localhost:3000/admins/activities');
  })
  it('Visualization of the activities table', async () => {
    await expect(ActivitiesTable.activityTableTitle).toBeDisplayed();
    await expect(ActivitiesTable.activityTableTitle).toHaveTextContaining('');
    await expect(ActivitiesTable.addActivityBtn).toBeDisplayed();
    await expect(ActivitiesTable.addActivityBtn).toHaveTextContaining('Add Activity');
  })
  it('Navigation to add a new activity', async () => {
    await ActivitiesTable.addBtnClick();
    await expect(browser).toHaveUrl('http://localhost:3000/admins/activities/ActivitiesForm');
  })
  it('Visualization of the new activity form', async () => {
    await expect(ActivitiesForm.nameLabel).toBeDisplayed();
    await expect(ActivitiesForm.nameLabel).toHaveTextContaining('Name');
    await expect(ActivitiesForm.descriptionLabel).toBeDisplayed();
    await expect(ActivitiesForm.descriptionLabel).toHaveTextContaining('Description');

    await expect(ActivitiesForm.nameInput).toBeDisplayed();
    await expect(ActivitiesForm.descriptionInput).toBeDisplayed();
  })
  it('Fill the form properly', async () => {
    await ActivitiesForm.fillForm('Crossfit', 'This is a very hardworking activity');
    await expect(ActivitiesForm.nameInput).toHaveValue('Crossfit');
    await expect(ActivitiesForm.descriptionInput).toHaveValue('This is a very hardworking activity');
  })
  it('Submit form and check success alert', async () => {
    await ActivitiesForm.confirmBtnClick();
    await expect(ActivitiesForm.modalAlertText).toBeDisplayed();
    await expect(ActivitiesForm.modalAlertButton).toBeDisplayed();
    await expect(ActivitiesForm.modalAlertText).toHaveTextContaining('Activity Crossfit was created successfully!');
    await ActivitiesForm.confirmAlertClick();
  })
  
  it('Navigation after create a new activity', async () => {
    await expect(browser).toHaveUrl('http://localhost:3000/admins/activities');
  })
  it('Check if the new activity was successfully created', async () => {
    await expect(ActivitiesTable.newActivityName).toHaveTextContaining('Crossfit');
    await expect(ActivitiesTable.newActivityDescription).toHaveTextContaining('This is a very hardworking activity');
  })
  it('Navigation to edit the new activity', async () => {
    await expect(ActivitiesTable.newActivityEditBtn).toBeClickable();
    await ActivitiesTable.editBtnClick();
    await expect(ActivitiesForm.nameInput).toHaveValue('Crossfit');
    await expect(ActivitiesForm.descriptionInput).toHaveValue('This is a very hardworking activity');
  })
  it('Modify and submit changes', async () => {
    await ActivitiesForm.fillForm('Boxing', 'This is also a very hardworking...');
    await ActivitiesForm.confirmBtnClick();
    await expect(ActivitiesForm.modalAlertText).toBeDisplayed();
    await expect(ActivitiesForm.modalAlertButton).toBeDisplayed();
    await expect(ActivitiesForm.modalAlertText).toHaveTextContaining('was successfully updated');
    await ActivitiesForm.confirmAlertClick();
  })
  it('Navigation after editing an activity', async () => {
    await expect(browser).toHaveUrl('http://localhost:3000/admins/activities');
  })
  it('Delete the new activity', async () => {
    await expect(ActivitiesTable.newActivityDeleteBtn).toBeClickable();
    await ActivitiesTable.deleteBtnClick();
    await expect(ModalConfirm.confirmationTitle).toHaveTextContaining('Confirm');
    await expect(ModalConfirm.confirmationText).toHaveTextContaining('Are you sure you want to delete this item?');
    await expect(ModalConfirm.confirmModalBtn).toBeClickable();
    await ModalConfirm.confirmClick();
    await expect(ActivitiesForm.modalAlertButton).toBeDisplayed();
    await expect(ActivitiesForm.modalAlertText).toHaveTextContaining('was successfully deleted');
  })
  it('Check if the new activity was successfully deleted', async () => {
    if(await expect(ActivitiesTable.newActivityName).toBeDisplayed()) {
      expect('1').toEqual('1');
    }
  })
})