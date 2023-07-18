const SignIn = require('../../test/pageObjects/sharedComponents/signIn');
const ModalAlert = require('../pageObjects/sharedComponents/modalAlert');

describe('Trainer complete flow.', function () {
  beforeAll('Open browser', async function () {
    browser.setWindowSize(1440, 1024);
    browser.url('https://juvi-megarocket-app.vercel.app/');
  });

  it('Log in with invalid credentials', async () => {
    await SignIn.signInBtn.waitForDisplayed();
    await SignIn.signInBtnClick();

    await expect(browser).toHaveUrlContaining('sign-in');

    await SignIn.emailInput.waitForDisplayed();
    await SignIn.passwordInput.waitForDisplayed();
    await SignIn.emailInput.setValue('any@thing.com');
    await SignIn.passwordInput.setValue('wrongPassword');
    expect(await SignIn.passwordInput.getAttribute('type')).toEqual('password');
    await SignIn.showHidePasswordBtnClick();
    expect(await SignIn.passwordInput.getAttribute('type')).toEqual('text');
    await SignIn.showHidePasswordBtnClick();

    await SignIn.submitBtnClick();

    expect(await ModalAlert.modalAlertMessage()).toContain('Error');
    await ModalAlert.confirmAlertClick();
  });

  it('Log in with trainer user', async () => {
    await SignIn.signInBtn.waitForDisplayed();
    await SignIn.signInBtnClick();

    await expect(browser).toHaveUrlContaining('sign-in');

    await SignIn.emailInput.waitForDisplayed();
    await SignIn.passwordInput.waitForDisplayed();
    await SignIn.fillFormLogInTrainer();
    expect(await SignIn.passwordInput.getAttribute('type')).toEqual('password');
    await SignIn.showHidePasswordBtnClick();
    expect(await SignIn.passwordInput.getAttribute('type')).toEqual('text');

    await SignIn.submitBtnClick();

    expect(await ModalAlert.modalAlertMessage()).toContain('success');
    await ModalAlert.confirmAlertClick();

    await expect(browser).toHaveUrlContaining('trainer');
  });
});
