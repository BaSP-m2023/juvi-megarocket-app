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
    await expect (SignUpMember.inputName).addValue('Victoria');
    await expect (SignUpMember.inputLastName).addValue('Ramirez');
    await expect (SignUpMember.inputDni).addValue('3366622');
    await expect (SignUpMember.inputPhone).addValue('3542223334');
    await expect (SignUpMember.inputEmail).addValue();
    await expect (SignUpMember.inputCity).addValue();
    await expect (SignUpMember.inputBday).addValue();
    await expect (SignUpMember.inputZip).addValue();
    await expect (SignUpMember.inputPassword).addValue();
    await expect (SignUpMember.inputSelect).addValue();
    await Button.submitMemberButtonClick();
    await expect (ModalAlert.modalALertAddMember).toBeDisplayed();
    await ModalAlert.buttonAddCofirmMemberClick();
  });
});
