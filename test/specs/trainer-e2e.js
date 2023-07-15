const LogIn = require('../pageObjects/sharedComponents/logIn');
const ModalAlert = require('../pageObjects/sharedComponents/modalAlert');

describe('Trainer complete flow.', function () {
  beforeAll('Open browser', async function () {
    browser.setWindowSize(1440, 1024);
    browser.url('https://juvi-megarocket-app.vercel.app/');
  });

  it('Log in with invalid credentials', async () => {
    await LogIn.signInBtn.waitForDisplayed();
    await LogIn.signInBtnClick();

    await expect(browser).toHaveUrlContaining('sign-in');

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
  });

  it('Log in with trainer user', async () => {
    await LogIn.signInBtn.waitForDisplayed();
    await LogIn.signInBtnClick();

    await expect(browser).toHaveUrlContaining('sign-in');

    await LogIn.emailInput.waitForDisplayed();
    await LogIn.passwordInput.waitForDisplayed();
    await LogIn.fillFormLogInTrainer();
    expect(await LogIn.passwordInput.getAttribute('type')).toEqual('password');
    await LogIn.showHidePasswordBtnClick();
    expect(await LogIn.passwordInput.getAttribute('type')).toEqual('text');

    await LogIn.submitBtnClick();

    expect(await ModalAlert.modalAlertMessage()).toContain('success');
    await ModalAlert.confirmAlertClick();

    await expect(browser).toHaveUrlContaining('trainer');
  });
});
