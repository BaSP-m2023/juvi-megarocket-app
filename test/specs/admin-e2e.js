const TrainersPage = require ("../../test/pageObjects/admin/trainersPage.js");
const Buttons = require ("../../test/pageObjects/sharedComponents/button.js");
const ModalAlert = require ("../../test/pageObjects/sharedComponents/modalAlert.js");
const ModalConfirm = require ("../../test/pageObjects/sharedComponents/modalConfirm.js");
const LogIn = require ("../../test/pageObjects/sharedComponents/login.js");

describe('page of trainers', () =>{
  beforeAll('open browser', () =>{
      browser.url("https://juvi-megarocket-app.vercel.app/auth");
  });

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
});
