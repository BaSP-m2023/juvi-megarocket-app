const activities = require('../pageObjects/member/activities');

describe('display of activities', function () {
  beforeAll('Open browser for test activities display', async function () {
    browser.setWindowSize(1440, 1024);
    browser.url('https://juvi-megarocket-app.vercel.app/members/activities');
  });

  /*it('Navigate to activities page', async () => {

  });*/

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