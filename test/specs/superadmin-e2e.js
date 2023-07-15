const Login = require('../pageObjects/sharedComponents/logIn');
const ModalAlert = require('../pageObjects/sharedComponents/modalAlert');

describe('Super admin complete flow, log in, and crud of admin.', function () {
  beforeAll('Open browser', async function () {
    browser.setWindowSize(1440, 1024);
    browser.url('https://juvi-megarocket-app.vercel.app/');
  });

  it('Log in with invalid credentials', async () => {
    await Login.signInBtn.waitForDisplayed();
    await Login.signInBtnClick();

    await expect(browser).toHaveUrlContaining('sign-in');

    await Login.emailInput.waitForDisplayed();
    await Login.passwordInput.waitForDisplayed();
    await Login.emailInput.setValue('any@thing.com');
    await Login.passwordInput.setValue('wrongPassword');
    expect(await Login.passwordInput.getAttribute('type')).toEqual('password');
    await Login.showHidePasswordBtnClick();
    expect(await Login.passwordInput.getAttribute('type')).toEqual('text');
    await Login.showHidePasswordBtnClick();

    await Login.submitBtnClick();

    expect(await ModalAlert.modalAlertMessage()).toContain('Error');
    await ModalAlert.confirmAlertClick();
  });

  it('Log in with super admin user', async () => {
    await Login.signInBtn.waitForDisplayed();
    await Login.signInBtnClick();

    await expect(browser).toHaveUrlContaining('sign-in');

    await Login.emailInput.waitForDisplayed();
    await Login.passwordInput.waitForDisplayed();
    await Login.fillFormLogInSuperAdmin();
    expect(await Login.passwordInput.getAttribute('type')).toEqual('password');
    await Login.showHidePasswordBtnClick();
    expect(await Login.passwordInput.getAttribute('type')).toEqual('text');

    await Login.submitBtnClick();

    expect(await ModalAlert.modalAlertMessage()).toContain('success');
    await ModalAlert.confirmAlertClick();

    await expect(browser).toHaveUrlContaining('super-admin');
  });
});
