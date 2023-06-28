const TrainersPage = require("../../test/pageObjects/TrainersPage");
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
    await expect (TableShared.ListOfTrainers).toBeDislayed();
    await Button.addButtonClick();
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers/form');
    await expect (TrainersPage.addTrainerForm).toBeDislayed();
    await expect (TrainersPage.firstNameInput).toBeDisplayed();
    await expect (TrainersPagePage.lastNameInput).toBeDisplayed();
    await expect (TrainersPagePage.cityInput).toBeDisplayed();
    await expect (TrainersPagePage.dniInput).toBeDisplayed();
    await expect (TrainersPagePage.emailInput).toBeDisplayed();
    await expect (TrainersPagePage.phoneInput).toBeDisplayed();
    await expect (TrainersPagePage.salaryInput).toBeDisplayed();
    await expect (TrainersPagePage.passwordInput).toBeDisplayed();
    await TrainersPage.addTrainerForm("Victoria", "Ramirez", "Rosario", "35666222",
    "vicramirez1@gmail.com", "3415566223","50000", "vic2514");
    await TrainersPage.confirmButtonClick();
    await expect (ModalAlert.alertSucces).toBeDislayed();
    await ModalAlert.confirmButtonClick();
  });

  it ('edit trainer', async() => {
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers');
    await TableShared.editButtonClick();
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers/form/649b7d18097aee6a52c1b5bd');
    await expect (TrainersPage.addTrainerForm).toBeDislayed();
    await TrainersPage.editTrainerForm("Funes", "60000", "victoria2514");
    await button.confirmEditButtonClick();
    await expect (ModalAlert.alertSucces).toBeDislayed();
    await ModalAlert.confirmModalSuccesButtonClick();
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers');
  });

  it('delete trainer', async() =>{
    await TableShared.editButtonClick();
    await TableShared.deleteButtonClick();
    await expect (ModalConfirm.modalConfirmDelete).toBeDislayed();
    await Button.confirmDeleteButtonClick();
    await expect (ModalAlert.confirmAlertDelete).toBeDisplayed();
    await Button.newconfirmDeleteButtonClick();
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers');
    await TrainersPage.facebookButtonClick();
    await browser.newWindow('https://www.facebook.com/radiumrocket');
    await browser.closeWindow();
  });
});
