const members = require('../pageObjects/admin/members');
const modalConfirm = require('../pageObjects/sharedComponents/modalConfirm');
const buttons = require('../pageObjects/sharedComponents/button');
const modalAlert = require('../pageObjects/sharedComponents/modalAlert');
const login = require('../pageObjects/logIn');

describe('Members edit and delete flow', function () {
    beforeAll('Open browser', async function () {
      browser.setWindowSize(1440, 1024);
      browser.url('http://localhost:3000/auth');
    })

  it('Log in and navigate to the members section', async () => {
      await login.signInBtn.waitForDisplayed();
      await login.signInBtnClick();

      await expect(browser).toHaveUrlContaining("sign-in");

      await login.emailInput.waitForDisplayed();
      await login.passwordInput.waitForDisplayed();
      await login.fillFormLogInAdmin();
      expect(await login.passwordInput.getAttribute('type')).toEqual('password');
      await login.showHidePasswordBtnClick();
      expect(await login.passwordInput.getAttribute('type')).toEqual('text');

      await login.submitBtnClick();

      expect(await modalAlert.modalAlertMessage()).toContain('success');
      await modalAlert.confirmAlertClick();

      await expect(browser).toHaveUrlContaining("admin");

  })

  it('Verify the title is Members and table is displayed.', async function () {
    await members.membersTitle.waitForDisplayed();
    const textTitle = await members.membersTitleText();
    expect(await textTitle).toEqual('Members');

    await members.membersTable.waitForDisplayed();
  });

  it('Click in the first member\'s edit button, should open the form, then press cancel and go back to table.',
  async function () {

    await members.firstMemberEditBtn.waitForDisplayed();
    await members.firstMemberEditBtnClick();
    await expect(browser).toHaveUrlContaining("form");

    await buttons.cancelBtn.scrollIntoView();
    await buttons.cancelBtn.waitForDisplayed();
    await buttons.cancelBtnClick();
    await members.membersTable.waitForDisplayed();
  });

  it('Click again to edit first member, change all the inputs values and click reset to test the data is restored.',
  async function () {

    await members.firstMemberEditBtn.waitForDisplayed();
    await members.firstMemberEditBtnClick();
    await expect(browser).toHaveUrlContaining("form");

    const memberPreviousName = members.nameInputEditMembers.getAttribute('value');

    await members.updateFillForm();
    expect(await members.passwordInputEditMembers.getAttribute('type')).toEqual('password');
    await members.showHidePasswordBtnClick();
    expect(await members.passwordInputEditMembers.getAttribute('type')).toEqual('text');

    browser.pause(2000);

    await buttons.resetBtnClick();

    const memberResetName = members.nameInputEditMembers.getAttribute('value');

    expect(await memberPreviousName).toEqual(await memberResetName);

    await members.showHidePasswordBtnClick();

  })

  it('Change all the inputs and submit the update.', async function () {

    //const memberPreviousName = members.nameInputEditMembers.getAttribute('value');

    await members.updateFillForm();
    expect(await members.passwordInputEditMembers.getAttribute('type')).toEqual('password');
    await members.showHidePasswordBtnClick();
    expect(await members.passwordInputEditMembers.getAttribute('type')).toEqual('text');
    // Pause for complete the time field
    await browser.pause(5000);

    //const memberNewName = members.nameInputEditMembers.getAttribute('value');

    await buttons.submitBtn.waitForDisplayed();
    await buttons.submitBtnClick();

    await modalAlert.modalAlertText.waitForDisplayed();
    expect(await modalAlert.modalAlertMessage()).toContain('updated');

    await modalAlert.modalAlertButton.waitForDisplayed();
    await modalAlert.confirmAlertClick();

    await expect(browser).toHaveUrl('http://localhost:3000/admins/members');

    expect(await members.firstMemberNameText()).toEqual('Automation');

  })

  it('Click to delete the first member, the modal must open, cancel the delete with the button.', async function () {
    await members.firstMemberDeleteBtn.waitForDisplayed();
    await members.firstMemberDeleteBtnClick();

    await members.modalConfirmDelete.waitForDisplayed();
    expect(await modalConfirm.confirmMessage()).toMatch(/sure.*delete/i);
    await modalConfirm.cancelModalBtn.waitForDisplayed();
    await modalConfirm.cancelClick();

    await expect(members.membersTable).toBeDisplayed();
  })

  it('Click to delete the first members, the modal must open and click to confirm the delete.', async function () {
    await members.firstMemberDeleteBtn.waitForDisplayed();
    await members.firstMemberDeleteBtnClick();

    await members.modalConfirmDelete.waitForDisplayed();
    expect(await modalConfirm.confirmMessage()).toMatch(/sure.*delete/i);
    await modalConfirm.confirmModalBtn.waitForDisplayed();
    await modalConfirm.confirmClick();

    await modalAlert.modalAlertText.waitForDisplayed();
    expect(await modalAlert.modalAlertMessage()).toMatch(/deleted.*successfully/i);

    await modalAlert.modalAlertButton.waitForDisplayed();
    await modalAlert.confirmAlertClick();

    await expect(browser).toHaveUrl('http://localhost:3000/admins/members');

  })

});

