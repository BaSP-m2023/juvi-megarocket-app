/* eslint-disable no-undef */
const SignUpMember = require("../../test/pageObjects/member/signUpPage.js");
const Buttons = require ("../../test/pageObjects/sharedComponents/button.js");
const ModalAlert = require ("../../test/pageObjects/sharedComponents/modalAlert.js");
const ModalConfirm = require ("../../test/pageObjects/sharedComponents/modalConfirm.js");
const LogIn = require("../../test/pageObjects/sharedComponents/login.js");
const EditProfile = require("../../test/pageObjects/member/editProfile.js");
const Membership = require("../../test/pageObjects/member/membership.js");

describe('page of sign up', () => {
  beforeAll('open browser', () => {
    browser.url('https://juvi-megarocket-app.vercel.app/auth');
  });

  it ('complete form', async () =>{
    await SignUpMember.SingUpNavbarClick();
    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/auth/sign-up')
    await SignUpMember.formSignUp("Armando", "Rodriguez", "rodri125@gmail.com", "rodri125@gmail.com", "31665222", "3415568223",
     "Fisherton", "19-05-1998", "2000", "armando2514");
    await SignUpMember.optionSelectBlackClick();
    await browser.pause(2000);
    await Buttons.submitBtnClick();
    await expect(ModalAlert.modalAlertText).toBeDisplayed();
    await ModalAlert.confirmAlertClick();
    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/auth/sign-in');
  });

  it('Log in with member user', async () => {
    await LogIn.emailInput.waitForDisplayed();
    await LogIn.passwordInput.waitForDisplayed();
    await LogIn.fillFormLogInMember();
    expect(await LogIn.passwordInput.getAttribute('type')).toEqual('password');
    await LogIn.showHidePasswordBtnClick();
    expect(await LogIn.passwordInput.getAttribute('type')).toEqual('text');
    await LogIn.submitBtnClick();
    expect(await ModalAlert.modalAlertMessage()).toContain('success');
    await ModalAlert.confirmAlertClick();
  });

  it('navigate on membership', async ()=>{
    await Membership.memebershipNavbarClick();
    await expect (browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/member/membership');
    await expect (Membership.membershipScreen).toBeDisplayed();
    await Membership.membershipCardClassicClick();
    await expect (Membership.membershipCardClassickList).toBeDisplayed();
  });

  it('change profile', async()=> {
    await SignUpMember.homeNavbarClick();
    await EditProfile.profileMemberNavbarClick();
    await browser.refresh();
    await EditProfile.editFormMember("3546623889", "Alvear");
    await EditProfile.optionSelectClassicClick();
    await Buttons.submitBtnClick();
    await expect (ModalAlert.modalAlertText).toContain('member update');
    await ModalAlert.modalAlertButtonClick();
    await Buttons.logoutBtnClick();
  });
});