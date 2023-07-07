/* eslint-disable no-undef */
const SignUpMember = require("../../test/pageObjects/member/signUpPage.js");
const Button = require ("../../test/pageObjects/sharedComponents/button.js");
const modalAlert = require("../../test/pageObjects/sharedComponents/modalAlert.js");
const ModalAlert = require ("../../test/pageObjects/sharedComponents/modalAlert.js");
const ModalConfirm = require ("../../test/pageObjects/sharedComponents/modalConfirm.js");
const TableShared = require ("../../test/pageObjects/sharedComponents/table.js");

describe('page of sign up', () => {
  beforeAll('open browser', () => {
    browser.url('http://localhost:3000/members/signUp');
  });

  it ('complete form', async () =>{
    await SignUpMember.formSignUp("Victoria", "Ramirez", "31665222", "3415568223",
    "vicrami25@gmail.com", "Fisherton", "19-05-1995", "2000", "vicram2514", "Black");
    await browser.pause(4000);
    await Button.submitMemberButtonClick();
    await expect(ModalAlert.modalALertAddMember).toBeDisplayed();
    await ModalAlert.buttonAddCofirmMemberClick();
    await expect(browser).toHaveUrl('http://localhost:3000/members');
  });

  it ('navigate on activities', async ()=>{
    await expect (SignUpMember.navbar).toBeDisplayed();
    await SignUpMember.activitiesNavbarClick();
    await expect (browser).toHaveUrl('http://localhost:3000/members/activities');
    await expect (SignUpMember.cardsActivities).toBeDisplayed();
  });

  it('change profile', async()=> {
    await expect(SignUpMember.navbar).toBeDisplayed();
    await Button.profileMemberNavbarClick();
    await expect (browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/member/profile');
    await SignUpMember.editFormMember("3546623889", "Alvear");
    
  });
});
