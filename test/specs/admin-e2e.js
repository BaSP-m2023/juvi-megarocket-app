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
    await expect (TableShared.ListOfTrainers).waitForDisplayed();
    await Button.addButtonClick();
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers/form');
    await expect (TrainersPage.addTrainerForm).waitForDisplayed();
    await expect (TrainersPage.firstNameInput).waitForDisplayed();
    await expect (TrainersPage.lastNameInput).waitForDisplayed();
    await expect (TrainersPage.cityInput).waitForDisplayed();
    await expect (TrainersPage.dniInput).waitForDisplayed();
    await expect (TrainersPage.emailInput).waitForDisplayed();
    await expect (TrainersPage.phoneInput).waitForDisplayed();
    await expect (TrainersPage.salaryInput).waitForDisplayed();
    await expect (TrainersPage.passwordInput).waitForDisplayed();
    await TrainersPage.addTrainerForm("Victoria", "Ramirez", "Rosario", "35666222",
    "vicramirez1@gmail.com", "3415566223","50000", "vic2514");
    await TrainersPage.confirmButtonClick();
    await expect (ModalAlert.alertSucces).waitForDisplayed();
    await ModalAlert.confirmButtonClick();
  });

  it ('edit trainer', async() => {
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers');
    await TableShared.editButtonClick();
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers/form/649b7d18097aee6a52c1b5bd');
    await expect (TrainersPage.addTrainerForm).waitForDisplayed();
    await expect(TrainersPage.firstNameInput).toHaveAttribute('Victoria');
    await button.confirmEditButtonClick();
    await expect (ModalAlert.alertSucces).waitForDisplayed();
    await ModalAlert.confirmModalSuccesButtonClick();
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers');
  });

  it('delete trainer', async() =>{
    await TableShared.deleteButtonClick();
    await expect (ModalConfirm.modalConfirmDelete).waitForDisplayed();
    await Button.confirmDeleteButtonClick();
    await expect (ModalAlert.confirmAlertDelete).waitForDisplayed();
    await Button.newconfirmDeleteButtonClick();
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers');
    await TrainersPage.facebookButtonClick();
    await browser.newWindow('https://www.facebook.com/radiumrocket');
    await browser.closeWindow();
  });

});
