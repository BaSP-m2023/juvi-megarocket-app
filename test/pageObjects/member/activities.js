class Activities{
  get activitiesBtn() {
    return $(`[data-testid="navbar"] li:nth-child(2) a`);
  }

  get cardsMainContainer() {
    return $('[data-testid="member-cards-container"]')
  }

  get activitiesTitle() {
    return $(`[data-testid="member-cards-container"] h1`)
  }

  get firstCardContainer() {
    return this.cardsMainContainer.$(':nth-child(2)')
  }

  get secondCardContainer() {
    return this.cardsMainContainer.$(':nth-child(3)')
  }

  get thirdCardContainer() {
    return this.cardsMainContainer.$(':nth-child(4)')
  }

  get firstCardFirstCardContainer() {
    return this.cardsMainContainer.$(':nth-child(2) :nth-child(1)')
  }

  get secondCardFirstCardContainer() {
    return this.cardsMainContainer.$(':nth-child(2) :nth-child(2)')
  }

  get thirdCardFirstCardContainer() {
    return this.cardsMainContainer.$(':nth-child(2) :nth-child(3)')
  }

  get firstCardSecondCardContainer() {
    return this.cardsMainContainer.$(':nth-child(3) :nth-child(1)')
  }

  get secondCardSecondCardContainer() {
    return this.cardsMainContainer.$(':nth-child(3) :nth-child(2)')
  }

  get thirdCardSecondCardContainer() {
    return this.cardsMainContainer.$(':nth-child(3) :nth-child(3)')
  }

  get firstCardThirdCardContainer() {
    return this.cardsMainContainer.$(':nth-child(4) :nth-child(1)')
  }

  get secondCardThirdCardContainer() {
    return this.cardsMainContainer.$(':nth-child(4) :nth-child(2)')
  }

  get thirdCardThirdCardContainer() {
    return this.cardsMainContainer.$(':nth-child(4) :nth-child(3)')
  }

  async activitiesBtnClick() {
    await this.activitiesBtn.click();
  }

  async activitiesTitleText() {
    return this.activitiesTitle.getText()
  }
};

module.exports = new Activities;