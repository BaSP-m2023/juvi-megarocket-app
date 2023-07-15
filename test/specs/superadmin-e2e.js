const Login = require('../pageObjects/sharedComponents/logIn');
const ModalAlert = require('../pageObjects/sharedComponents/modalAlert');
const AdminsCRUD = require('../pageObjects/superAdmin/adminCRUD');

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

  it('Navigate to admins section', async () => {
    await AdminsCRUD.adminsBtn.waitForDisplayed();
    await AdminsCRUD.adminsBtnClick();

    expect(browser).toHaveUrlContaining('admins');
  });

  it('Click to create a new admin, and then click in cancel button.', async () => {
    await AdminsCRUD.adminTitle.waitForDisplayed();
    const textTitle = await AdminsCRUD.adminTitleText();
    expect(await textTitle).toEqual('Admins');
    await AdminsCRUD.adminTable.waitForDisplayed();

    await Buttons.addBtn.waitForDisplayed();
    await Buttons.addBtnClick();
    await expect(browser).toHaveUrlContaining("super-admin/admins/form");

    await Buttons.cancelBtn.waitForDisplayed();
    await Buttons.cancelBtnClick();

    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/super-admin/admins');
  });

  it('Click to add a new admin to the table and fill the form, reset and fill again to confirm . Verify if the new admin is displayed in the table', async () => {
    await AdminsCRUD.adminTitleTitle.waitForDisplayed();
    const title = await AdminsCRUD.adminTitleText();
    expect(await title).toEqual('Admin');
    await AdminsCRUD.adminTable.waitForDisplayed();

    const initialAdminsCount = await AdminsCRUD.getNumberOfAdmins();

    await Buttons.addBtn.waitForDisplayed();
    await Buttons.addBtnClick();
    await expect(browser).toHaveUrlContaining("super-admin/admins/form");

    await AdminsCRUD.firstNameInput.waitForDisplayed();

    await AdminsCRUD.fillFormAddAdmin();
    await Buttons.resetBtn.waitForDisplayed();
    await Buttons.resetBtnClick();

    const nameValue = await AdminsCRUD.firstNameInput.getValue();
    await expect(nameValue).toEqual('');

    await AdminsCRUD.fillFormAddAdmin();
    await Buttons.confirmBtn.waitForDisplayed();
    await Buttons.confirmBtnClick();

    await ModalAlert.modalAlertText.waitForDisplayed();
    expect(await ModalAlert.modalAlertMessage()).toContain('created');

    await ModalAlert.modalAlertButton.waitForDisplayed();
    await ModalAlert.confirmAlertClick();

    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/super-admin/admins');

    await AdminsCRUD.adminTitleTitle.waitForDisplayed();
    const titleText = await AdminsCRUD.adminTitleText();
    expect(await titleText).toEqual('Admin');
    await AdminsCRUD.adminTable.waitForDisplayed();

    const finalAdminsCount = await AdminsCRUD.getNumberOfAdmins();

    expect(finalAdminsCount).toEqual(initialAdminsCount + 1);

    const lastAdminName = await AdminsCRUD.lastAdminNameText();
    expect(await lastAdminName).toEqual('Micaela');
  })

  it('Edit the last admin on the table and verify if it has changes', async () => {
    await AdminsCRUD.adminTitleTitle.waitForDisplayed();
    const titleText = await AdminsCRUD.adminTitleText();
    expect(await titleText).toEqual('Admin');
    await AdminsCRUD.adminTable.waitForDisplayed();

    await AdminsCRUD.lastAdminEditBtn.waitForDisplayed();
    await AdminsCRUD.lastAdminEditBtnClick();
    await expect(browser).toHaveUrlContaining('https://juvi-megarocket-app.vercel.app/super-admin/admins/form');

    await AdminsCRUD.passwordInput.waitForDisplayed();
    await AdminsCRUD.fillFormEditAdmin();
    await Buttons.confirmBtn.waitForDisplayed();
    await Buttons.confirmBtnClick();

    await ModalAlert.modalAlertText.waitForDisplayed();
    expect(await ModalAlert.modalAlertMessage()).toContain('updated');

    await ModalAlert.modalAlertButton.waitForDisplayed();
    await ModalAlert.confirmAlertClick();

    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/super-admin/admins');

    await AdminsCRUD.adminTitleTitle.waitForDisplayed();
    const title = await AdminsCRUD.adminTitleText();
    expect(await title).toEqual('Admin');
    await AdminsCRUD.adminTable.waitForDisplayed();

    const lastAdminName = await AdminsCRUD.lastAdminNameText();
    expect(await lastAdminName).toEqual('Edith');
  })
});
