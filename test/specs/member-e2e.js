const activities = require('../pageObjects/member/activities');
const { date } = require('joi');
const ProfileForm = require('../../test/pageObjects/member/profile/profileForm');
//const login = require('../pageObjects/logIn');

describe('display of activities', function () {
  beforeAll('Open browser for test activities display', async function () {
    browser.setWindowSize(1440, 1024);
    browser.url('https://juvi-megarocket-app.vercel.app/');
  });

  /*it('Log in with invalid credentials', async () => {
    login.emailInput.setValue('any@thing.com');
    login.passwordInput.setValue('wrongPassword');

    //faltan test id para desarrollar los modales

  })

  it('Log in correctly and navigate to activities page', async () =>{
    expect(login.signInBtn).waitForDisplayed();
    await login.signInBtnClick();

    expect(browser).toHaveUrlContaining('sign-in');

    await login.fillFormLogInMember();

    expect(await login.passwordInput.getAttribute('type')).toEqual('password');
    await login.showHidePasswordBtnClick();
    expect(await login.passwordInput.getAttribute('type')).toEqual('text');

    await login.logInBtn.waitForDisplayed();
    await login.logInBtnClick();

    //faltan test id para desarrollar los modales

  })*/

  it('Verify the title is Activities', async function () {
    await activities.activitiesTitle.waitForDisplayed();
    const textTitle = await activities.activitiesTitleText();
    await expect(textTitle).toEqual('Activities');
  });

  it('Verify the first two cards containers are displayed and have 3 cards each one.', async function () {
    await activities.firstCardContainer.waitForDisplayed();
    await activities.firstCardFirstCardContainer.waitForDisplayed();
    await activities.secondCardFirstCardContainer.waitForDisplayed();
    await activities.thirdCardFirstCardContainer.waitForDisplayed();

    await activities.secondCardContainer.waitForDisplayed();
    await activities.firstCardSecondCardContainer.waitForDisplayed();
    await activities.secondCardSecondCardContainer.waitForDisplayed();
    await activities.thirdCardSecondCardContainer.waitForDisplayed();
  });

  it('Verify if the third card container exist, if exist verify to have at least 1 card and max 3 cards.', async function () {
    const isThirdCardContainerExisting = await activities.thirdCardContainer.isExisting();

    if (isThirdCardContainerExisting) {
      const cardsThirdCardContainer = await activities.thirdCardContainer.$$('div');
      const cardsCountThirdCardContainer = cardsThirdCardContainer.length;

      expect(cardsCountThirdCardContainer).toBeGreaterThanOrEqual(1);
      expect(cardsCountThirdCardContainer).toBeLessThanOrEqual(3);
    } else {
      expect(true).toBe(true);
    }
  });
});

describe('Complete process to edit a member profile', () => {
  beforeAll('Browser openning', () => {
    browser.url('http://localhost:3000/members/profile');
  })
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
    await expect(ProfileForm.submitBtn).toBeDisplayed();
    await ProfileForm.submitBtnClick();
  })
  it('Verification of success modal and click', async() => {
    await expect(ProfileForm.successModalText).toHaveTextContaining('Member updated correctly!');
    await expect(ProfileForm.successModalBtn).toBeDisplayed();
    await ProfileForm.successBtnClick();
  })
  it('Correct navigation to members panel', async() => {
    await expect(browser).toHaveUrl('http://localhost:3000/members')
  })
})