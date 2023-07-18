const SignUpMember = require('../pageObjects/member/signUpPage');
const Buttons = require ('../pageObjects/sharedComponents/button');
const SignIn = require('../../test/pageObjects/sharedComponents/signIn');
const Membership = require('../pageObjects/member/membership');
const ProfileForm = require('../pageObjects/member/profileForm');
const Activities = require('../pageObjects/member/activities');
const ModalAlert = require('../pageObjects/sharedComponents/modalAlert');
const MemberNavbar = require ('../../test/pageObjects/navbar/memberNavbar');
const ModalConfirm = require ('../../test/pageObjects/sharedComponents/modalConfirm');

describe('Members complete flow.', function () {
  beforeAll('Open browser for test activities display', async function () {
    browser.setWindowSize(1440, 1024);
    browser.url('https://juvi-megarocket-app.vercel.app/');
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

  it('Log in with invalid credentials', async () => {
    await SignIn.signInBtn.waitForDisplayed();
    await SignIn.signInBtnClick();

    await expect(browser).toHaveUrlContaining("sign-in");

    await SignIn.emailInput.waitForDisplayed();
    await SignIn.passwordInput.waitForDisplayed();
    await SignIn.emailInput.setValue('any@thing.com');
    await SignIn.passwordInput.setValue('wrongPassword');
    expect(await SignIn.passwordInput.getAttribute('type')).toEqual('password');
    await SignIn.showHidePasswordBtnClick();
    expect(await SignIn.passwordInput.getAttribute('type')).toEqual('text');
    await SignIn.showHidePasswordBtnClick();

    await SignIn.submitBtnClick();

    expect(await ModalAlert.modalAlertMessage()).toContain('Error');
    await ModalAlert.confirmAlertClick();

  });

  it('Log in with member user', async () => {
    await SignIn.emailInput.waitForDisplayed();
    await SignIn.passwordInput.waitForDisplayed();
    await SignIn.fillFormLogInMember();
    expect(await SignIn.passwordInput.getAttribute('type')).toEqual('password');
    await SignIn.showHidePasswordBtnClick();
    expect(await SignIn.passwordInput.getAttribute('type')).toEqual('text');
    await SignIn.submitBtnClick();
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

  it('navigate on membership', async ()=>{
    await Membership.memebershipNavbarClick();
    await expect (browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/member/membership');
    await expect (Membership.membershipScreen).toBeDisplayed();
    await Membership.membershipCardClassicClick();
    await expect (Membership.membershipCardClassickList).toBeDisplayed();
  });

  it('Navigate to activities page', async function () {

    await Activities.activitiesBtn.waitForDisplayed();
    await Activities.activitiesBtnClick();

    await expect(browser).toHaveUrlContaining("activities");
    await Activities.activitiesTitle.waitForDisplayed();
    const textTitle = await Activities.activitiesTitleText();
    expect(textTitle).toEqual('Activities');
  });

  it('Verify the first two cards containers are displayed and have 3 cards each one.', async function () {
    await Activities.firstCardContainer.waitForDisplayed();
    await Activities.firstCardFirstCardContainer.waitForDisplayed();
    await Activities.secondCardFirstCardContainer.waitForDisplayed();
    await Activities.thirdCardFirstCardContainer.waitForDisplayed();

    await Activities.secondCardContainer.waitForDisplayed();
    await Activities.firstCardSecondCardContainer.waitForDisplayed();
    await Activities.secondCardSecondCardContainer.waitForDisplayed();
    await Activities.thirdCardSecondCardContainer.waitForDisplayed();
  });

  it('Verify if the third card container exist, if exist verify to have at least 1 card and max 3 cards.', async function () {
    const isThirdCardContainerExisting = await Activities.thirdCardContainer.isExisting();

    if (isThirdCardContainerExisting) {
      const cardsThirdCardContainer = await Activities.thirdCardContainer.$$('div');
      const cardsCountThirdCardContainer = cardsThirdCardContainer.length;

      expect(cardsCountThirdCardContainer).toBeGreaterThanOrEqual(1);
      expect(cardsCountThirdCardContainer).toBeLessThanOrEqual(9);
    } else {
      expect(true).toBe(true);
    }
  });

//Start of profile section

  it('Navigation to profile section', async()=> {
    await expect(MemberNavbar.profile).toBeDisplayed();
    await MemberNavbar.profileClick();
  });
  it('Checks all the labels of the form', async() => {
    await expect(ProfileForm.nameLabel).toHaveTextContaining('Name')
    await expect(ProfileForm.lastNameLabel).toHaveTextContaining('Last Name')
    await expect(ProfileForm.idLabel).toHaveTextContaining('DNI')
    await expect(ProfileForm.phoneLabel).toHaveTextContaining('Phone')
    await expect(ProfileForm.emailLabel).toHaveTextContaining('Email')
    await expect(ProfileForm.cityLabel).toHaveTextContaining('City')
    await expect(ProfileForm.dateLabel).toHaveTextContaining('Birth Day')
    await expect(ProfileForm.zipLabel).toHaveTextContaining('Zip')
    await expect(ProfileForm.passwordLabel).toHaveTextContaining('Password')
    await expect(ProfileForm.membershipLabel).toHaveTextContaining('Membership')
  })
  it('Checks that the info is properly loaded', async() => {
    await expect(ProfileForm.nameInput).toHaveValue('Gianluca')
    await expect(ProfileForm.lastNameInput).toHaveValue('Agrano')
    await expect(ProfileForm.idInput).toHaveValue('44555666')
    await expect(ProfileForm.phoneInput).toHaveValue('3414445555')
    await expect(ProfileForm.emailInput).toHaveValue('gianlucka1@gmail.com')
    await expect(ProfileForm.cityInput).toHaveValue('Rosario')
    await expect(ProfileForm.zipInput).toHaveValue('2000')
    await expect(ProfileForm.passwordInput).toHaveValue('contrasena123')
    await expect(ProfileForm.membershipSelect).toHaveValue('Black')
  })
  it('Change all the information and submit', async() => {
    await ProfileForm.fillProfileForm('Juan', 'Canton', '42129353', '3413520137',
    'juanignaciocanton1@gmail.com', 'Buenos aires', '21-08-1999',
    '4321', 'newpass123')
    await expect(Buttons.submitBtn).toBeDisplayed();
    await Buttons.submitBtnClick();
  })
  it('Verification of success modal and click', async() => {
    await expect(ModalAlert.modalAlertText).toHaveTextContaining('Member updated correctly!');
    await expect(ModalAlert.modalAlertButton).toBeDisplayed();
    await ModalAlert.confirmAlertClick();
  })
  it('Correct navigation to members panel', async() => {
    await expect(browser).toHaveUrl('https://juvi-megarocket-app.vercel.app/member')
  })
});
