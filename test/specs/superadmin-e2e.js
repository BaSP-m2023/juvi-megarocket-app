const SignIn = require('../../test/pageObjects/sharedComponents/signIn');
const ModalAlert = require('../pageObjects/sharedComponents/modalAlert');
const AdminsCRUD = require('../pageObjects/superAdmin/adminCRUD');
const Buttons = require('../pageObjects/sharedComponents/button');
const ModalConfirm = require('../pageObjects/sharedComponents/modalConfirm');

describe('Super admin complete flow, log in, and crud of admin.', function () {
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

  it('Log in with super admin user', async () => {
    await SignIn.signInBtn.waitForDisplayed();
    await SignIn.signInBtnClick();

    await expect(browser).toHaveUrlContaining('sign-in');

    await SignIn.emailInput.waitForDisplayed();
    await SignIn.passwordInput.waitForDisplayed();
    await SignIn.fillFormLogInSuperAdmin();
    expect(await SignIn.passwordInput.getAttribute('type')).toEqual('password');
    await SignIn.showHidePasswordBtnClick();
    expect(await SignIn.passwordInput.getAttribute('type')).toEqual('text');

    await SignIn.submitBtnClick();

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
    await AdminsCRUD.adminTitle.waitForDisplayed();
    const title = await AdminsCRUD.adminTitleText();
    expect(await title).toEqual('Admins');
    await AdminsCRUD.adminTable.waitForDisplayed();

    const initialAdminsCount = await AdminsCRUD.getNumberOfAdmins();

    await Buttons.addBtn.waitForDisplayed();
    await Buttons.addBtnClick();
    await expect(browser).toHaveUrlContaining("super-admin/admins/form");

    await AdminsCRUD.firstNameInput.waitForDisplayed();

    await AdminsCRUD.passwordInput.waitForDisplayed();
    await AdminsCRUD.fillFormAddAdmin();
    await Buttons.resetBtn.waitForDisplayed();
    await Buttons.resetBtnClick();

    const nameValue = await AdminsCRUD.firstNameInput.getValue();
    await expect(nameValue).toEqual('');

    await AdminsCRUD.passwordInput.waitForDisplayed();
    await AdminsCRUD.fillFormAddAdmin();
    await Buttons.submitBtn.waitForDisplayed();
    await Buttons.submitBtnClick();

    await ModalAlert.modalAlertText.waitForDisplayed();
    expect(await ModalAlert.modalAlertMessage()).toContain('created');

    await ModalAlert.modalAlertButton.waitForDisplayed();
    await ModalAlert.confirmAlertClick();

    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/super-admin/admins');

    await AdminsCRUD.adminTitle.waitForDisplayed();
    const titleText = await AdminsCRUD.adminTitleText();
    expect(await titleText).toEqual('Admins');
    await AdminsCRUD.adminTable.waitForDisplayed();

    const finalAdminsCount = await AdminsCRUD.getNumberOfAdmins();

    expect(finalAdminsCount).toEqual(initialAdminsCount + 1);

    const lastAdminName = await AdminsCRUD.lastAdminNameText();
    expect(await lastAdminName).toEqual('Micaela');
  })

  it('Edit the last admin on the table and verify if it has changes', async () => {
    await AdminsCRUD.adminTitle.waitForDisplayed();
    const titleText = await AdminsCRUD.adminTitleText();
    expect(await titleText).toEqual('Admins');
    await AdminsCRUD.adminTable.waitForDisplayed();

    await AdminsCRUD.lastAdminEditBtn.waitForDisplayed();
    await AdminsCRUD.lastAdminEditBtnClick();
    await expect(browser).toHaveUrlContaining('https://juvi-megarocket-app.vercel.app/super-admin/admins/form');

    await AdminsCRUD.passwordInput.waitForDisplayed();
    await AdminsCRUD.fillFormEditAdmin();
    await Buttons.submitBtn.waitForDisplayed();
    await Buttons.submitBtnClick();

    await ModalAlert.modalAlertText.waitForDisplayed();
    expect(await ModalAlert.modalAlertMessage()).toContain('updated');

    await ModalAlert.modalAlertButton.waitForDisplayed();
    await ModalAlert.confirmAlertClick();

    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/super-admin/admins');

    await AdminsCRUD.adminTitle.waitForDisplayed();
    const title = await AdminsCRUD.adminTitleText();
    expect(await title).toEqual('Admins');
    await AdminsCRUD.adminTable.waitForDisplayed();

    const lastAdminName = await AdminsCRUD.lastAdminNameText();
    expect(await lastAdminName).toEqual('Edith');
  })

  it('Delete the last admin on the table', async () => {
    await AdminsCRUD.adminTitle.waitForDisplayed();
    const titleText = await AdminsCRUD.adminTitleText();
    expect(await titleText).toEqual('Admins');
    await AdminsCRUD.adminTable.waitForDisplayed();

    const initialAdminsCount = await AdminsCRUD.getNumberOfAdmins();

    await AdminsCRUD.lastAdminDeleteBtn.waitForDisplayed();
    await AdminsCRUD.lastAdminDeleteBtnClick();

    await ModalConfirm.confirmationText.waitForDisplayed();
    expect(await ModalConfirm.confirmMessage()).toMatch(/sure.*delete/i);
    await ModalConfirm.confirmModalBtn.waitForDisplayed();
    await ModalConfirm.confirmClick();

    await ModalAlert.modalAlertText.waitForDisplayed();
    expect(await ModalAlert.modalAlertMessage()).toContain('deleted');

    await ModalAlert.modalAlertButton.waitForDisplayed();
    await ModalAlert.confirmAlertClick();

    await AdminsCRUD.adminTitle.waitForDisplayed();
    const title = await AdminsCRUD.adminTitleText();
    expect(await title).toEqual('Admins');
    await AdminsCRUD.adminTable.waitForDisplayed();

    const finalAdminsCount = await AdminsCRUD.getNumberOfAdmins();

    expect(finalAdminsCount).toEqual(initialAdminsCount - 1);

  })
});
