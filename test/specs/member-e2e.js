/* eslint-disable no-undef */
const SignUpMember = require("../../test/pageObjects/member/signUpPage.js");
const Buttons = require ("../../test/pageObjects/sharedComponents/button.js");
const ModalAlert = require ("../../test/pageObjects/sharedComponents/modalAlert.js");
const ModalConfirm = require ("../../test/pageObjects/sharedComponents/modalConfirm.js");
const LogIn = require("../../test/pageObjects/sharedComponents/login.js");
const modalAlert = require("../../test/pageObjects/sharedComponents/modalAlert.js");

describe('page of sign up', () => {
  beforeAll('open browser', () => {
    browser.url('https://juvi-megarocket-app.vercel.app/auth');
  });

  it ('complete form', async () =>{
    await SignUpMember.SingUpNavbarClick();
    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/auth/sign-up')
    await SignUpMember.formSignUp("Victoria", "Ramirez", "vicrami25@gmail.com", "vicrami25@gmail.com", "31665222", "3415568223",
     "Fisherton", "19-05-1995", "2000", "vicram2514");
    await SignUpMember.optionSelectBlackClick();
    await browser.pause(2000);
    await Buttons.submitBtnClick();
    await expect(ModalAlert.modalAlertText).toBeDisplayed();
    await ModalAlert.modalAlertButtonClick();
    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/auth/sign-in');
  });

  it('login member', async ()=>{
    await LogIn.signInBtnClick();
    await SignUpMember.signIn("pablomorad@hotmail.com", "Chimpance1");
    await LogIn.submitBtnClick();
    await expect (ModalAlert.modalAlertText).toBeDisplayed();
    await ModalAlert.modalAlertButtonClick();
    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/member');
  });

  it('navigate on activities', async ()=>{
    await SignUpMember.activitiesNavbarClick();
    await expect (SignUpMember.screenActivities).toBeDisplayed();
    await SignUpMember.cardGapClick();
    await expect (SignUpMember.cardText).toBeDisplayed();
  });

  it('navigate on membership', async ()=>{
    await SignUpMember.memebershipNavbarClick();
    await expect (browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/member/membership');
    await expect (SignUpMember.membershipScreen).toBeDisplayed();
    await SignUpMember.membershipCardClassicClick();
    await expect (SignUpMember.membershipCardClassickList).toBeDisplayed();
  });

  it('change profile', async()=> {
    await SignUpMember.homeNavbarClick();
    await SignUpMember.profileMemberNavbarClick();
  // await browser.refresh();
  // await SignUpMember.editFormMember("3546623889", "Alvear");
  // await SignUpMember.optionSelectClassicClick();
  // await Buttons.submitBtnClick();
  // await expect (ModalAlert.modalAlertText).toContain('member update');
  // await ModalAlert.modalAlertButtonClick();
    await Buttons.logoutBtnClick();
  });
});