const members = require('../pageObjects/admin/members');

describe('Members edit and delete flow', function () {
    beforeAll('Open browser', async function () {
      browser.setWindowSize(1440, 1024);
      browser.url('http://localhost:3000/admins/members');
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

    await members.cancelMembersEditFormBtn.scrollIntoView();
    await members.cancelMembersEditFormBtn.waitForDisplayed();
    await members.cancelMembersEditFormBtnClick();
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

    await members.resetMembersEditFormBtnClick();

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

    await members.submitMembersEditFormBtn.waitForDisplayed();
    await members.submitMembersEditFormBtnClick();

    await members.successEditModal.waitForDisplayed();
    expect(await members.successEditModalTextDisplayed()).toContain('updated');

    await members.successEditModalCloseBtn.waitForDisplayed();
    await members.successEditModalCloseBtnClick();

    await expect(browser).toHaveUrl('http://localhost:3000/admins/members');

    expect(await members.firstMemberNameText()).toEqual('Automation');

  })

  it('Click to delete the first member, the modal must open, cancel the delete with the button.', async function () {
    await members.firstMemberDeleteBtn.waitForDisplayed();
    await members.firstMemberDeleteBtnClick();

    await members.modalConfirmDelete.waitForDisplayed();
    expect(await members.modalConfirmDeleteMessage()).toMatch(/sure.*delete/i);
    await members.modalConfirmDeleteCancelBtn.waitForDisplayed();
    await members.modalConfirmDeleteCancelBtnClick();

    await expect(members.membersTable).toBeDisplayed();
  })

  it('Click to delete the first members, the modal must open and click to confirm the delete.', async function () {
    await members.firstMemberDeleteBtn.waitForDisplayed();
    await members.firstMemberDeleteBtnClick();

    await members.modalConfirmDelete.waitForDisplayed();
    expect(await members.modalConfirmDeleteMessage()).toMatch(/sure.*delete/i);
    await members.modalConfirmDeleteConfirmBtn.waitForDisplayed();
    await members.modalConfirmDeleteConfirmBtnClick();

    await members.successDeleteModal.waitForDisplayed();
    expect(await members.successDeleteModalMessage()).toMatch(/deleted.*successfully/i);

    await members.successDeleteModalCloseBtn.waitForDisplayed();
    await members.successDeleteModalCloseBtnClick();

    await expect(browser).toHaveUrl('http://localhost:3000/admins/members');

  })

});

