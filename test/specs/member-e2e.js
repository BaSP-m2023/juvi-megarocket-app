/* eslint-disable no-undef */
const SignUpMember = require("../pageObjects/member/signUpPage");
const Button = require ("../pageObjects/sharedComponents/button");
const modalAlert = require("../pageObjects/sharedComponents/modalAlert");
const ModalAlert = require ("../pageObjects/sharedComponents/modalAlert");
const ModalConfirm = require ("../pageObjects/sharedComponents/modalConfirm");
const TableShared = require ("../pageObjects/sharedComponents/table");

describe('page of sign up', () => {
  beforeAll('open browser', () => {
    browser.setWindowSize(1360, 768);
    browser.url('http://localhost:3000/members/signUp');
  });

  it ('complete form', async () =>{
    await expect(SignUpMember.formSignUp).toBeDisplayed();
    await SignUpMember.formSignUp("Victoria", "Ramirez", "31665222", "3415568223",
    "vicrami25@gmail.com", "Fisherton","19/05/1995", "2000", "vicram2514");
    await Button.submitMemberButtonClick();
    await expect (ModalAlert.modalALertAddMember).toBeDisplayed();
    await ModalAlert.buttonAddCofirmMemberClick();
  });
});
