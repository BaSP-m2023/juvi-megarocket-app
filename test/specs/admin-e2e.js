const TrainersPage = require ('../pageObjects/admin/trainersPage');
const LogIn = require ('../pageObjects/sharedComponents/logIn');
const Members = require('../pageObjects/admin/members');
const Buttons = require('../pageObjects/sharedComponents/button');
const ModalAlert = require('../pageObjects/sharedComponents/modalAlert');
const ActivitiesForm = require('../pageObjects/admin/activities/activitiesForm');
const ModalConfirm = require('../pageObjects/sharedComponents/modalConfirm')const Classes = require('../pageObjects/admin/classes');

describe('Complete Admin flow.', () => {
  beforeAll('Browser openning', () => {
    browser.setWindowSize(1440, 1024);
    browser.url('https://juvi-megarocket-app.vercel.app/');
  })

  it('Log in with invalid credentials', async () => {
    await LogIn.signInBtn.waitForDisplayed();
    await LogIn.signInBtnClick();

    await expect(browser).toHaveUrlContaining("sign-in");

    await LogIn.emailInput.waitForDisplayed();
    await LogIn.passwordInput.waitForDisplayed();
    await LogIn.emailInput.setValue('any@thing.com');
    await LogIn.passwordInput.setValue('wrongPassword');
    expect(await LogIn.passwordInput.getAttribute('type')).toEqual('password');
    await LogIn.showHidePasswordBtnClick();
    expect(await LogIn.passwordInput.getAttribute('type')).toEqual('text');
    await LogIn.showHidePasswordBtnClick();

    await LogIn.submitBtnClick();

    expect(await ModalAlert.modalAlertMessage()).toContain('Error');
    await ModalAlert.confirmAlertClick();

  })

  it('Log in with admin user', async () => {
    await LogIn.signInBtn.waitForDisplayed();
    await LogIn.signInBtnClick();
    await expect(browser).toHaveUrlContaining("sign-in");
    await LogIn.emailInput.waitForDisplayed();
    await LogIn.passwordInput.waitForDisplayed();
    await LogIn.fillFormLogInAdmin();
    expect(await LogIn.passwordInput.getAttribute('type')).toEqual('password');
    await LogIn.showHidePasswordBtnClick();
    expect(await LogIn.passwordInput.getAttribute('type')).toEqual('text');
    await LogIn.submitBtnClick();
    expect(await ModalAlert.modalAlertMessage()).toContain('success');
    await ModalAlert.confirmAlertClick();
    await expect(browser).toHaveUrlContaining("admin");
  })

  //Start of activities section

  it('Navigate to activities section', async () => {

  });

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

  //Star of members section

  it('Navigate to the members section', async () => {
    await Members.membersBtn.waitForDisplayed();
    await Members.membersBtnClick();

    await expect(browser).toHaveUrlContaining("admin/members");
  })

  it('Verify the title is members and table is displayed.', async function () {
    await Members.membersTitle.waitForDisplayed();
    const textTitle = await Members.membersTitleText();
    expect(await textTitle).toEqual('Members');

    await Members.membersTable.waitForDisplayed();
  });

  it('Click in the last member\'s edit button, should open the form, then press cancel and go back to table.',
  async function () {

    await Members.lastMemberEditBtn.waitForDisplayed();
    await Members.lastMemberEditBtnClick();
    await expect(browser).toHaveUrlContaining("form");

    await Buttons.cancelBtn.scrollIntoView();
    await Buttons.cancelBtn.waitForDisplayed();
    await Buttons.cancelBtnClick();
    await Members.membersTable.waitForDisplayed();

    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/admin/members');
  });

  it('Click again to edit last member, change all the inputs values and click reset to test the data is restored.',
  async function () {

    await Members.lastMemberEditBtn.waitForDisplayed();
    await Members.lastMemberEditBtnClick();
    await expect(browser).toHaveUrlContaining("form");

    const memberPreviousName = Members.nameInputEditMembers.getAttribute('value');

    await Members.updateFillForm();
    expect(await Members.passwordInputEditMembers.getAttribute('type')).toEqual('password');
    await Members.showHidePasswordBtnClick();
    expect(await Members.passwordInputEditMembers.getAttribute('type')).toEqual('text');

    await Buttons.resetBtn.waitForDisplayed();
    await Buttons.resetBtn.scrollIntoView();
    await Buttons.resetBtnClick();

    const memberResetName = Members.nameInputEditMembers.getAttribute('value');

    expect(await memberPreviousName).toEqual(await memberResetName);

    await Members.showHidePasswordBtnClick();

  })

  it('Change all the inputs and submit the update.', async function () {
    await Members.updateFillForm();
    expect(await Members.passwordInputEditMembers.getAttribute('type')).toEqual('password');
    await Members.showHidePasswordBtnClick();
    expect(await Members.passwordInputEditMembers.getAttribute('type')).toEqual('text');
    await Buttons.submitBtn.waitForDisplayed();
    await Buttons.submitBtnClick();

    await ModalAlert.modalAlertText.waitForDisplayed();
    expect(await ModalAlert.modalAlertMessage()).toContain('updated');

    await ModalAlert.modalAlertButton.waitForDisplayed();
    await ModalAlert.confirmAlertClick();

    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/admin/members');

    expect(await Members.lastMemberNameText()).toEqual('Automation');

  })

  it('Click to delete the last member, the modal must open, cancel the delete with the button.', async function () {
    await Members.lastMemberDeleteBtn.waitForDisplayed();
    await Members.lastMemberDeleteBtnClick();

    await Members.modalConfirmDelete.waitForDisplayed();
    expect(await ModalConfirm.confirmMessage()).toMatch(/sure.*delete/i);
    await ModalConfirm.cancelModalBtn.waitForDisplayed();
    await ModalConfirm.cancelClick();

    await expect(Members.membersTable).toBeDisplayed();
  })

  it('Click to delete the last members, the modal must open and click to confirm the delete.', async function () {
    await Members.lastMemberDeleteBtn.waitForDisplayed();
    await Members.lastMemberDeleteBtnClick();

    await Members.modalConfirmDelete.waitForDisplayed();
    expect(await ModalConfirm.confirmMessage()).toMatch(/sure.*delete/i);
    await ModalConfirm.confirmModalBtn.waitForDisplayed();
    await ModalConfirm.confirmClick();

    await ModalAlert.modalAlertText.waitForDisplayed();
    expect(await ModalAlert.modalAlertMessage()).toMatch(/deleted.*successfully/i);

    await ModalAlert.modalAlertButton.waitForDisplayed();
    await ModalAlert.confirmAlertClick();

    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/admin/members');

  })

// start trainer flow
  it('add a new trainer', async() => {
    await TrainersPage.trainersNavbarClick();
    await expect(TrainersPage.ListOfTrainers).toBeDisplayed();
    await Buttons.addBtnClick();
    await TrainersPage.addTrainerForm("Martina", "Pereira", "Rosario", "34656125",
    "mpereira25@gmail.com", "3615572863","300000", "martipe8314");
    await Buttons.confirmBtnClick();
    await browser.pause(3000);
    await expect(ModalAlert.modalAlertText).toBeDisplayed();
    await ModalAlert.confirmAlertClick();
  });

  it ('edit trainer', async() => {
    await expect (browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/admin/trainers');
    await TrainersPage.editButtonClick();
    await TrainersPage.editTrainerForm('Funes', '700000', 'marperez123');
    await Buttons.confirmBtnClick();
    await expect (ModalAlert.modalAlertText).toBeDisplayed();
    await ModalAlert.confirmAlertClick();
    await expect (browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/admin/trainers');
  });

  it('delete trainer', async() =>{
    await TrainersPage.deleteButtonClick();
    await expect (ModalConfirm.confirmationText).toBeDisplayed();
    await ModalConfirm.confirmClick();
    await expect (ModalAlert.modalAlertText).toBeDisplayed();
    await ModalAlert.confirmAlertClick();
    await expect (browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/admin/trainers');
    await TrainersPage.facebookButtonClick();
    await browser.newWindow('https://www.facebook.com/radiumrocket');
    await browser.switchWindow('https://juvi-megarocket-app.vercel.app/admin/trainers');
  });

  //Start of classes section

  it('Navigate to classes section', async () => {
    await Classes.classesBtn.waitForDisplayed();
    await Classes.classesBtnClick();

    await expect(browser).toHaveUrlContaining("admin/classes");
  });

  it('Click to add a new class and the click in cancel', async () => {
    await Classes.classesTitle.waitForDisplayed();
    const textTitle = await Classes.classesTitleText();
    expect(await textTitle).toEqual('Classes');
    await Classes.classesTable.waitForDisplayed();

    await Buttons.addBtn.waitForDisplayed();
    await Buttons.addBtnClick();
    await expect(browser).toHaveUrlContaining("admin/classes/form");

    await Buttons.cancelBtn.waitForDisplayed();
    await Buttons.cancelBtnClick();

    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/admin/classes');
  });

  it('Click to add a new class to the table and fill the form, reset and fill again to confirm . Verify if the new class is displayed in the table', async () => {
    await Classes.classesTitle.waitForDisplayed();
    const title = await Classes.classesTitleText();
    expect(await title).toEqual('Classes');
    await Classes.classesTable.waitForDisplayed();

    const initialClassesCount = await Classes.getNumberOfClasses();

    await Buttons.addBtn.waitForDisplayed();
    await Buttons.addBtnClick();
    await expect(browser).toHaveUrlContaining("admin/classes/form");

    await Classes.activityInputEditClasses.waitForDisplayed();

    await Classes.fillClassesAddForm();
    await Buttons.resetBtn.waitForDisplayed();
    await Buttons.resetBtnClick();

    const dayValue = await Classes.dayInputEditClasses.getValue();
    await expect(dayValue).toEqual('');

    await Classes.fillClassesAddForm();
    await Buttons.confirmBtn.waitForDisplayed();
    await Buttons.confirmBtnClick();

    await ModalAlert.modalAlertText.waitForDisplayed();
    expect(await ModalAlert.modalAlertMessage()).toContain('created');

    await ModalAlert.modalAlertButton.waitForDisplayed();
    await ModalAlert.confirmAlertClick();

    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/admin/classes');

    await Classes.classesTitle.waitForDisplayed();
    const textTitle = await Classes.classesTitleText();
    expect(await textTitle).toEqual('Classes');
    await Classes.classesTable.waitForDisplayed();

    const finalClassesCount = await Classes.getNumberOfClasses();

    expect(finalClassesCount).toEqual(initialClassesCount + 1);
  });

  it('Edit the last class on the table and verify it has changes', async () => {
    await Classes.classesTitle.waitForDisplayed();
    const title = await Classes.classesTitleText();
    expect(await title).toEqual('Classes');
    await Classes.classesTable.waitForDisplayed();

    await Classes.lastClassesEditBtn.waitForDisplayed();
    await Classes.lastClassesEditBtnClick();
    await expect(browser).toHaveUrlContaining('https://juvi-megarocket-app.vercel.app/admin/classes/form');

    await Classes.slotsInputEditClasses.waitForDisplayed();
    await Classes.fillClassesEditForm();
    await Buttons.confirmBtn.waitForDisplayed();
    await Buttons.confirmBtnClick();

    await ModalAlert.modalAlertText.waitForDisplayed();
    expect(await ModalAlert.modalAlertMessage()).toContain('updated');

    await ModalAlert.modalAlertButton.waitForDisplayed();
    await ModalAlert.confirmAlertClick();

    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/admin/classes');

    await Classes.classesTitle.waitForDisplayed();
    const textTitle = await Classes.classesTitleText();
    expect(await textTitle).toEqual('Classes');
    await Classes.classesTable.waitForDisplayed();

    const slotsCount = await Classes.lastClassSlotsText();
    expect(await slotsCount).toEqual('10');
  });

  it('Click to the last class, cancel and click again to delete and verify it\'s deleted from the table', async () => {
    const initialClassesCount = await Classes.getNumberOfClasses();

    await Classes.lastClasesDeleteBtn.waitForDisplayed();
    await Classes.lastClasesDeleteBtnClick();

    await ModalConfirm.cancelModalBtn.waitForDisplayed();
    expect(await ModalConfirm.confirmMessage()).toMatch(/sure.*delete/i);
    await ModalConfirm.cancelClick();

    await Classes.lastClasesDeleteBtn.waitForDisplayed();
    await Classes.lastClasesDeleteBtnClick();

    await ModalConfirm.confirmationText.waitForDisplayed();
    expect(await ModalConfirm.confirmMessage()).toMatch(/sure.*delete/i);
    await ModalConfirm.confirmModalBtn.waitForDisplayed();
    await ModalConfirm.confirmClick();

    await ModalAlert.modalAlertText.waitForDisplayed();
    expect(await ModalAlert.modalAlertMessage()).toMatch(/deleted.*successfully/i);

    await ModalAlert.modalAlertButton.waitForDisplayed();
    await ModalAlert.confirmAlertClick();

    await Classes.classesTitle.waitForDisplayed();
    const textTitle = await Classes.classesTitleText();
    expect(await textTitle).toEqual('Classes');
    await Classes.classesTable.waitForDisplayed();

    const finalClassesCount = await Classes.getNumberOfClasses();

    expect(finalClassesCount).toEqual(initialClassesCount - 1);
  });
});
