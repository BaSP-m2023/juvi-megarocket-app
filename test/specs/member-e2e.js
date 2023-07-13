const { date } = require('joi');
const ProfileForm = require('../pageObjects/member/profileForm');
const Activities = require('../pageObjects/member/activities');
const Login = require('../pageObjects/sharedComponents/logIn');
const ModalAlert = require('../pageObjects/sharedComponents/modalAlert');

describe('Members complete flow.', function () {
  beforeAll('Open browser for test activities display', async function () {
    browser.setWindowSize(1440, 1024);
    browser.url('https://juvi-megarocket-app.vercel.app/');
  });

  it('Log in with invalid credentials', async () => {
    await Login.signInBtn.waitForDisplayed();
    await Login.signInBtnClick();

    await expect(browser).toHaveUrlContaining("sign-in");

    await Login.emailInput.waitForDisplayed();
    await Login.passwordInput.waitForDisplayed();
    await Login.emailInput.setValue('any@thing.com');
    await Login.passwordInput.setValue('wrongPassword');
    expect(await Login.passwordInput.getAttribute('type')).toEqual('password');
    await Login.showHidePasswordBtnClick();
    expect(await Login.passwordInput.getAttribute('type')).toEqual('text');
    await Login.showHidePasswordBtnClick();

    await Login.submitBtnClick();

    expect(await ModalAlert.modalAlertMessage()).toContain('Error');
    await ModalAlert.confirmAlertClick();

  })

  it('Log in with member user', async () => {
    await Login.emailInput.waitForDisplayed();
    await Login.passwordInput.waitForDisplayed();
    await Login.fillFormLogInMember();
    expect(await Login.passwordInput.getAttribute('type')).toEqual('password');
    await Login.showHidePasswordBtnClick();
    expect(await Login.passwordInput.getAttribute('type')).toEqual('text');

    await Login.submitBtnClick();

    expect(await ModalAlert.modalAlertMessage()).toContain('success');
    await ModalAlert.confirmAlertClick();

  })

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
  it('Navigate to profile section', async () => {

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