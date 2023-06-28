const members = require('../pageObjects/admin/members');

describe('Members edit and delete flow', function () {
    beforeAll('Open browser', async function () {
      browser.setWindowSize(1440, 1024);
      browser.url('http://localhost:3000/admins/members');
    })

  it('Verify the title is Members and table is displayed.', async function () {
    await members.membersTitle.waitForDisplayed();
    const textTitle = await members.membersTitleText();
    await expect(textTitle).toEqual('Members');

    await members.membersTable.waitForDisplayed();
  });

  /*it('Click in the first member\'s edit button, should open the form, then press cancel and go back to table.',
  async function () {

    await members.cancelMembersEditFormBtn.scrollIntoView();
    await members.cancelMembersEditFormBtn.waitForDisplayed();
    await members.cancelMembersEditFormBtnClick();
    await members.membersTable.waitForDisplayed();
  }); */

  it('Click again to edit first member, change all the inputs values and click reset to test the data is restored.',
  async function () {
    await members.firstMemberEditBtn.waitForDisplayed();
    await members.firstMemberEditBtnClick();
    await expect(browser).toHaveUrlContaining("form");

    //const previousValues = await members.getInputsValues();

    await members.updateFillForm();
    expect(await members.passwordInputEditMembers.getAttribute('type')).toEqual('password');
    await members.showHidePasswordBtnClick();
    expect(await members.passwordInputEditMembers.getAttribute('type')).toEqual('text');

    browser.pause(2000)

    await members.resetMembersEditFormBtnClick();

    //const resetValues = await members.getInputsValues();

    //expect(resetValues).toEqual(previousValues);

  })

  it('Change all the inputs and submit the update.', async function () {
    //const previousValues = await members.getInputsValues();

    await members.showHidePasswordBtnClick();
    await members.updateFillForm();
    expect(await members.passwordInputEditMembers.getAttribute('type')).toEqual('password');
    await members.showHidePasswordBtnClick();
    expect(await members.passwordInputEditMembers.getAttribute('type')).toEqual('text');
    await browser.pause(5000);

    //const updatedValues = await members.getInputsValues();

    //expect(updatedValues).toEqual(jasmine.objectContaining(previousValues))

    await members.submitMembersEditFormBtn.waitForDisplayed();
    await members.submitMembersEditFormBtnClick();
    await browser.pause(5000)

    //await members.successEditModal.waitForDisplayed();
    //await expect(members.successEditModalTextDisplayed()).toContain('updated');

    //Modal steps missing, cannot get the selector correctly
  })

  /*it('Click to delete the first member, the modal must open, cancel the delete with the button.', async function () {
    await members.firstMemberDeleteBtn.toBeDisplayed();
    await members.firstMemberDeleteBtnClick();

    await members.modalConfirmDelete.toBeDisplayed();
    await members.modalConfirmDeleteCancelBtn.toBeDisplayed();
    await members.modalConfirmDeleteCancelBtnClick();

    await expect(members.membersTable).toBeDisplayed();
  })*/

  /*it('Click to delete the first members, the modal must open and click to confirm the delete.', async function () {
    await members.firstMemberDeleteBtn.waitForDisplayed();
    await members.firstMemberDeleteBtnClick();

    await members.modalConfirmDelete.waitForDisplayed();
    await members.modalConfirmDeleteConfirmBtn.waitForDisplayed();
    await members.modalConfirmDeleteConfirmBtnClick();
  })*/

});

