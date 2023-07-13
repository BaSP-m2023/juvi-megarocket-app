const TrainersPage = require ("../../test/pageObjects/admin/trainersPage.js");
const Button = require ("../../test/pageObjects/sharedComponents/button.js");
const ModalAlert = require ("../../test/pageObjects/sharedComponents/modalAlert.js");
const ModalConfirm = require ("../../test/pageObjects/sharedComponents/modalConfirm.js");

describe('page of trainers', () =>{
  beforeAll('open browser', () =>{
      browser.url("http://localhost:3000/");
  });

  it('login admin', async() =>{
    await expect (browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/auth/sign-in');
    await TrainersPage.signInAdmin("octavitossse@gmail.com", "Marianobondar123456");
    await Button.submitButtonClick();
    await expect (ModalAlert.modalAlert).toBeDisplayed();
    await ModalAlert.modalAlertButtonClick();
    await expect (browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/admin')
    await expect (TrainersPage.navbarAdmin).toBeDisplayed();
    await TrainersPage.trainersNavbarClick();
  });

  it('add a new trainer', async() => {
    await expect(TrainersPage.ListOfTrainers).toBeDisplayed();
    await Button.addButtonClick();
    await expect(browser).toHaveUrl('http://localhost:3000/admins/trainers/form');
    await TrainersPage.addTrainerForm("Victoria", "Ramirez", "Rosario", "35666222",
    "vicramirez6@gmail.com", "3415566223","500000", "vicky2514");
    await Button.confirmButtonClick();
    await browser.pause(3000);
    await expect(ModalAlert.alertSucces).toBeDisplayed();
    await ModalAlert.confirmButtonClick();
  });

  it ('edit trainer', async() => {
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers');
    await TrainersPage.editButtonClick();
    await TrainersPage.editTrainerForm('Funes', '700000', 'victoria123');
    await Button.confirmButtonClick();
    await expect (ModalAlert.alertSucces).toBeDisplayed();
    await ModalAlert.confirmButtonModalClick();
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers');
  });

  it('delete trainer', async() =>{
    await TrainersPage.deleteButtonClick();
    await expect (ModalConfirm.modalConfirmDelete).toBeDisplayed();
    await Button.confirmButtonClick();
    await expect (ModalAlert.confirmAlertDelete).toBeDisplayed();
    await ModalAlert.confirmButtonModalClick();
    await expect (browser).toHaveUrl('http://localhost:3000/admins/trainers');
    await TrainersPage.facebookButtonClick();
    await browser.newWindow('https://www.facebook.com/radiumrocket');
    await browser.closeWindow();
  });
});
