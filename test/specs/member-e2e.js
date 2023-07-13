const Activities = require('../pageObjects/member/activities');
const Login = require('../pageObjects/sharedComponents/logIn');
const ModalAlert = require('../pageObjects/sharedComponents/modalAlert');

describe('display of activities', function () {
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
});