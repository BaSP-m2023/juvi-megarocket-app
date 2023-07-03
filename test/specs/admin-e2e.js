const TrainersPage = require ("../pageObjects/admin/trainersPage");
const Button = require ("../pageObjects/sharedComponents/button");
const ModalAlert = require ("../pageObjects/sharedComponents/modalAlert");
const ModalConfirm = require ("../pageObjects/sharedComponents/modalConfirm");
const TableShared = require ("../pageObjects/sharedComponents/table");

describe('page of trainers', () =>{
  beforeAll('open browser', () =>{
      browser.setWindowSize (1360, 768);
      browser.url("http://localhost:3000/admins/trainers");
  });

  it('add a new trainer', async()=>{
    await expect (TableShared.ListOfTrainers).waitForEnabled();
    await Button.addButtonClick();
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers/form');
    await expect (TrainersPage.addTrainerForm).waitForEnabled();
    await expect (TrainersPage.firstNameInput).waitForEnabled();
    await expect (TrainersPage.lastNameInput).waitForEnabled();
    await expect (TrainersPage.cityInput).waitForEnabled();
    await expect (TrainersPage.dniInput).waitForEnabled();
    await expect (TrainersPage.emailInput).waitForEnabled();
    await expect (TrainersPage.phoneInput).waitForEnabled();
    await expect (TrainersPage.salaryInput).waitForEnabled();
    await expect (TrainersPage.passwordInput).waitForEnabled();
    await TrainersPage.addTrainerForm("Victoria", "Ramirez", "Rosario", "35666222",
    "vicramirez1@gmail.com", "3415566223","50000", "vic2514");
    await TrainersPage.confirmButtonClick();
    await expect (ModalAlert.alertSucces).waitForEnabled();
    await ModalAlert.confirmButtonClick();
  });

  it ('edit trainer', async() => {
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers');
    await TableShared.editButtonClick();
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers/form/649b7d18097aee6a52c1b5bd');
    await expect (TrainersPage.addTrainerForm).waitForEnabled();
    await expect(TrainersPage.firstNameInput).toHaveAttribute('Victoria');
    await button.confirmEditButtonClick();
    await expect (ModalAlert.alertSucces).waitForEnabled();
    await ModalAlert.confirmModalSuccesButtonClick();
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers');
  });

  it('delete trainer', async() =>{
    await TableShared.deleteButtonClick();
    await expect (ModalConfirm.modalConfirmDelete).waitForEnabled();
    await Button.confirmDeleteButtonClick();
    await expect (ModalAlert.confirmAlertDelete).waitForEnabled();
    await Button.newconfirmDeleteButtonClick();
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers');
    await TrainersPage.facebookButtonClick();
    await browser.newWindow('https://www.facebook.com/radiumrocket');
    await browser.closeWindow();
  });

});
