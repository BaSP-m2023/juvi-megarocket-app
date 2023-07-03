/* eslint-disable no-undef */
const signUpPage = require("../pageObjects/member/signUpPage");
const Button = require ("../pageObjects/sharedComponents/button");
const ModalAlert = require ("../pageObjects/sharedComponents/modalAlert");
const ModalConfirm = require ("../pageObjects/sharedComponents/modalConfirm");
const TableShared = require ("../pageObjects/sharedComponents/table");

describe('page of sign up', () => {
  beforeAll('open browser', () => {
    browser.setWindowSize(1360, 768);
    browser.url('http://localhost:3000/members/signUp');
  });

  it ('complete form', async () =>{
    await expect(signUpPage.formSignUp).waitForEnabled();


  });
});
