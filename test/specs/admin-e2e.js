const TrainersPage = require ("../../test/pageObjects/admin/trainersPage.js");
const Button = require ("../../test/pageObjects/sharedComponents/button.js");
const ModalAlert = require ("../../test/pageObjects/sharedComponents/modalAlert.js");
const ModalConfirm = require ("../../test/pageObjects/sharedComponents/modalConfirm.js");
const TableShared = require ("../../test/pageObjects/sharedComponents/table.js");

describe('page of trainers', () =>{
  beforeAll('open browser', () =>{
      browser.url("http://localhost:3000/admins/trainers");
  });

  it('add a new trainer', async() => {
    await expect(TableShared.ListOfTrainers).toBeDisplayed();
    await Button.addButtonClick();
    await expect(browser).toHaveUrl('http://localhost:3000/admins/trainers/form');
    await TrainersPage.addTrainerForm("Victoria", "Ramirez", "Rosario", "35666222",
    "vicramirez6@gmail.com", "3415566223","500000", "vicky2514");
    await TrainersPage.confirmButtonClick();
    await browser.pause(3000);
    await expect(ModalAlert.alertSucces).toBeDisplayed();
    await ModalAlert.confirmButtonClick();
  });

  it ('edit trainer', async() => {
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers');
    await TableShared.editButtonClick();
    await TrainersPage.editTrainerForm('Funes', '700000', 'victoria123');
    await Button.confirmEditButtonClick();
    await expect (ModalAlert.alertSucces).toBeDisplayed();
    await Button.confirmModalSuccesButtonClick();
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers');
  });

  it('delete trainer', async() =>{
    await TableShared.deleteButtonClick();
    await expect (ModalConfirm.modalConfirmDelete).toBeDisplayed();
    await Button.confirmDeleteButtonClick();
    await expect (ModalAlert.confirmAlertDelete).toBeDisplayed();
    await Button.newconfirmDeleteButtonClick();
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers');
    await TrainersPage.facebookButtonClick();
    await browser.newWindow('https://www.facebook.com/radiumrocket');
    await browser.closeWindow();
  });
});
