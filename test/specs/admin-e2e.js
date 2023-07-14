const TrainersPage = require ("../../test/pageObjects/admin/trainersPage.js");
const Buttons = require ("../../test/pageObjects/sharedComponents/button.js");
const ModalAlert = require ("../../test/pageObjects/sharedComponents/modalAlert.js");
const ModalConfirm = require ("../../test/pageObjects/sharedComponents/modalConfirm.js");
const LogIn = require ("../../test/pageObjects/sharedComponents/login.js");

describe('page of trainers', () =>{
  beforeAll('open browser', () =>{
      browser.url("https://juvi-megarocket-app.vercel.app/auth");
  });

  it('login admin', async() =>{
    await LogIn.signInBtnClick();
    await expect (browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/auth/sign-in');
    await TrainersPage.signInAdmin("octavitossse@gmail.com", "Marianobondar123456");
    await LogIn.submitBtnClick();
    await expect (ModalAlert.modalAlertText).toBeDisplayed();
    await ModalAlert.modalAlertButtonClick();
    await expect (browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/admin');
    await TrainersPage.trainersNavbarClick();
  });

  it('add a new trainer', async() => {
    await expect(TrainersPage.ListOfTrainers).toBeDisplayed();
    await Buttons.addBtnClick();
    await TrainersPage.addTrainerForm("Marcos", "Garcia", "Rosario", "34656125",
    "marcosgarcia2@gmail.com", "3615569853","600000", "marquito2314");
    await Buttons.confirmBtnClick();
    await browser.pause(3000);
    await expect(ModalAlert.modalAlertText).toBeDisplayed();
    await ModalAlert.modalAlertButtonClick();
  });

  it ('edit trainer', async() => {
    await expect (browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/admin/trainers');
    await TrainersPage.editButtonClick();
    await TrainersPage.editTrainerForm('Funes', '700000', 'marco123');
    await Buttons.confirmBtnClick();
    await expect (ModalAlert.modalAlertText).toBeDisplayed();
    await ModalAlert.modalAlertButtonClick();
    await expect (browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/admin/trainers');
  });

  it('delete trainer', async() =>{
    await TrainersPage.deleteButtonClick();
    await expect (ModalConfirm.confirmationText).toBeDisplayed();
    await ModalConfirm.confirmClick();
    await expect (ModalAlert.modalAlertText).toBeDisplayed();
    await ModalAlert.modalAlertButtonClick();
    await expect (browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/admin/trainers');
    await TrainersPage.facebookButtonClick();
    await browser.newWindow('https://www.facebook.com/radiumrocket');
    await browser.switchWindow('https://juvi-megarocket-app.vercel.app/admin/trainers');
    await Buttons.logoutBtnClick();
  });
});
