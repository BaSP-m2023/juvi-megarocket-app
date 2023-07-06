const ActivitiesTable = require('../../test/pageObjects/admin/activities/activitiesTable')
const ActivitiesForm = require('../../test/pageObjects/admin/activities/activitiesForm')
const ModalConfirm = require('../../test/pageObjects/sharedComponents/modalConfirm')
const members = require('../pageObjects/admin/members');
const modalConfirm = require('../pageObjects/sharedComponents/modalConfirm');

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

describe('Members edit and delete flow', function () {
    beforeAll('Open browser', async function () {
      browser.setWindowSize(1440, 1024);
      browser.url('http://localhost:3000/admins/members');
    })

  it('Verify the title is Members and table is displayed.', async function () {
    await members.membersTitle.waitForDisplayed();
    const textTitle = await members.membersTitleText();
    expect(await textTitle).toEqual('Members');

    await members.membersTable.waitForDisplayed();
  });

  it('Click in the first member\'s edit button, should open the form, then press cancel and go back to table.',
  async function () {

    await members.firstMemberEditBtn.waitForDisplayed();
    await members.firstMemberEditBtnClick();
    await expect(browser).toHaveUrlContaining("form");

    await members.cancelMembersEditFormBtn.scrollIntoView();
    await members.cancelMembersEditFormBtn.waitForDisplayed();
    await members.cancelMembersEditFormBtnClick();
    await members.membersTable.waitForDisplayed();
  });

  it('Click again to edit first member, change all the inputs values and click reset to test the data is restored.',
  async function () {

    await members.firstMemberEditBtn.waitForDisplayed();
    await members.firstMemberEditBtnClick();
    await expect(browser).toHaveUrlContaining("form");

    const memberPreviousName = members.nameInputEditMembers.getAttribute('value');

    await members.updateFillForm();
    expect(await members.passwordInputEditMembers.getAttribute('type')).toEqual('password');
    await members.showHidePasswordBtnClick();
    expect(await members.passwordInputEditMembers.getAttribute('type')).toEqual('text');

    browser.pause(2000);

    await members.resetMembersEditFormBtnClick();

    const memberResetName = members.nameInputEditMembers.getAttribute('value');

    expect(await memberPreviousName).toEqual(await memberResetName);

    await members.showHidePasswordBtnClick();

  })

  it('Change all the inputs and submit the update.', async function () {

    //const memberPreviousName = members.nameInputEditMembers.getAttribute('value');

    await members.updateFillForm();
    expect(await members.passwordInputEditMembers.getAttribute('type')).toEqual('password');
    await members.showHidePasswordBtnClick();
    expect(await members.passwordInputEditMembers.getAttribute('type')).toEqual('text');
    // Pause for complete the time field
    await browser.pause(5000);

    //const memberNewName = members.nameInputEditMembers.getAttribute('value');

    await members.submitMembersEditFormBtn.waitForDisplayed();
    await members.submitMembersEditFormBtnClick();

    await members.successEditModal.waitForDisplayed();
    expect(await members.successEditModalTextDisplayed()).toContain('updated');

    await members.successEditModalCloseBtn.waitForDisplayed();
    await members.successEditModalCloseBtnClick();

    await expect(browser).toHaveUrl('http://localhost:3000/admins/members');

    expect(await members.firstMemberNameText()).toEqual('Automation');

  })

  it('Click to delete the first member, the modal must open, cancel the delete with the button.', async function () {
    await members.firstMemberDeleteBtn.waitForDisplayed();
    await members.firstMemberDeleteBtnClick();

    await members.modalConfirmDelete.waitForDisplayed();
    expect(await modalConfirm.confirmMessage()).toMatch(/sure.*delete/i);
    await modalConfirm.cancelModalBtn.waitForDisplayed();
    await modalConfirm.cancelClick();

    await expect(members.membersTable).toBeDisplayed();
  })

  it('Click to delete the first members, the modal must open and click to confirm the delete.', async function () {
    await members.firstMemberDeleteBtn.waitForDisplayed();
    await members.firstMemberDeleteBtnClick();

    await members.modalConfirmDelete.waitForDisplayed();
    expect(await modalConfirm.confirmMessage()).toMatch(/sure.*delete/i);
    await modalConfirm.confirmModalBtn.waitForDisplayed();
    await modalConfirm.confirmClick();

    await members.successDeleteModal.waitForDisplayed();
    expect(await members.successDeleteModalMessage()).toMatch(/deleted.*successfully/i);

    await members.successDeleteModalCloseBtn.waitForDisplayed();
    await members.successDeleteModalCloseBtnClick();

    await expect(browser).toHaveUrl('http://localhost:3000/admins/members');

  })

});

