const Members = require('../pageObjects/admin/members');
const ModalConfirm = require('../pageObjects/sharedComponents/modalConfirm');
const Buttons = require('../pageObjects/sharedComponents/button');
const ModalAlert = require('../pageObjects/sharedComponents/modalAlert');
const Login = require('../pageObjects/sharedComponents/logIn');

describe('Members edit and delete flow', function () {
    beforeAll('Open browser', async function () {
      browser.setWindowSize(1440, 1024);
      browser.url('https://juvi-megarocket-app.vercel.app/');
    })

  it('Log in with invalid credentials', async () => {
    await Login.signInBtn.waitForDisplayed();
    await Login.signInBtnClick();

    await expect(browser).toHaveUrlContaining("sign-in");

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

  })

  it('Log in with admin user', async () => {
    await Login.signInBtn.waitForDisplayed();
    await Login.signInBtnClick();

    await expect(browser).toHaveUrlContaining("sign-in");

    await Login.emailInput.waitForDisplayed();
    await Login.passwordInput.waitForDisplayed();
    await Login.fillFormLogInAdmin();
    expect(await Login.passwordInput.getAttribute('type')).toEqual('password');
    await Login.showHidePasswordBtnClick();
    expect(await Login.passwordInput.getAttribute('type')).toEqual('text');

    await Login.submitBtnClick();

    expect(await ModalAlert.modalAlertMessage()).toContain('success');
    await ModalAlert.confirmAlertClick();

    await expect(browser).toHaveUrlContaining("admin");
  })

  it('Navigate to the members section', async () => {
    await Members.membersBtn.waitForDisplayed();
    await Members.membersBtnClick();

    await expect(browser).toHaveUrlContaining("admin/members");
  })

  it('Verify the title is members and table is displayed.', async function () {
    await Members.membersTitle.waitForDisplayed();
    const textTitle = await Members.membersTitleText();
    expect(await textTitle).toEqual('Members');

    await Members.membersTable.waitForDisplayed();
  });

  it('Click in the first member\'s edit button, should open the form, then press cancel and go back to table.',
  async function () {

    await Members.firstMemberEditBtn.waitForDisplayed();
    await Members.firstMemberEditBtnClick();
    await expect(browser).toHaveUrlContaining("form");

    await Buttons.cancelBtn.scrollIntoView();
    await Buttons.cancelBtn.waitForDisplayed();
    await Buttons.cancelBtnClick();
    await Members.membersTable.waitForDisplayed();

    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/admin/members');
  });

  it('Click again to edit first member, change all the inputs values and click reset to test the data is restored.',
  async function () {

    await Members.firstMemberEditBtn.waitForDisplayed();
    await Members.firstMemberEditBtnClick();
    await expect(browser).toHaveUrlContaining("form");

    const memberPreviousName = Members.nameInputEditMembers.getAttribute('value');

    await Members.updateFillForm();
    expect(await Members.passwordInputEditMembers.getAttribute('type')).toEqual('password');
    await Members.showHidePasswordBtnClick();
    expect(await Members.passwordInputEditMembers.getAttribute('type')).toEqual('text');

    await Buttons.resetBtn.waitForDisplayed();
    await Buttons.resetBtn.scrollIntoView();
    await Buttons.resetBtnClick();

    const memberResetName = Members.nameInputEditMembers.getAttribute('value');

    expect(await memberPreviousName).toEqual(await memberResetName);

    await Members.showHidePasswordBtnClick();

  })

  it('Change all the inputs and submit the update.', async function () {
    await Members.updateFillForm();
    expect(await Members.passwordInputEditMembers.getAttribute('type')).toEqual('password');
    await Members.showHidePasswordBtnClick();
    expect(await Members.passwordInputEditMembers.getAttribute('type')).toEqual('text');
    await Buttons.submitBtn.waitForDisplayed();
    await Buttons.submitBtnClick();

    await ModalAlert.modalAlertText.waitForDisplayed();
    expect(await ModalAlert.modalAlertMessage()).toContain('updated');

    await ModalAlert.modalAlertButton.waitForDisplayed();
    await ModalAlert.confirmAlertClick();

    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/admin/members');

    expect(await Members.firstMemberNameText()).toEqual('Automation');

  })

  it('Click to delete the first member, the modal must open, cancel the delete with the button.', async function () {
    await Members.firstMemberDeleteBtn.waitForDisplayed();
    await Members.firstMemberDeleteBtnClick();

    await Members.modalConfirmDelete.waitForDisplayed();
    expect(await ModalConfirm.confirmMessage()).toMatch(/sure.*delete/i);
    await ModalConfirm.cancelModalBtn.waitForDisplayed();
    await ModalConfirm.cancelClick();

    await expect(Members.membersTable).toBeDisplayed();
  })

  it('Click to delete the first members, the modal must open and click to confirm the delete.', async function () {
    await Members.firstMemberDeleteBtn.waitForDisplayed();
    await Members.firstMemberDeleteBtnClick();

    await Members.modalConfirmDelete.waitForDisplayed();
    expect(await ModalConfirm.confirmMessage()).toMatch(/sure.*delete/i);
    await ModalConfirm.confirmModalBtn.waitForDisplayed();
    await ModalConfirm.confirmClick();

    await ModalAlert.modalAlertText.waitForDisplayed();
    expect(await ModalAlert.modalAlertMessage()).toMatch(/deleted.*successfully/i);

    await ModalAlert.modalAlertButton.waitForDisplayed();
    await ModalAlert.confirmAlertClick();

    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/admin/members');

  })
});
