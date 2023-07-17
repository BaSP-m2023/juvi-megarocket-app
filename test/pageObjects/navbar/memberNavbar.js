class MemberNavbar {
  get home(){
    return $('[data-testid="navbar"] li:nth-child(1) a');
  }
  get activity(){
    return $('[data-testid="navbar"] li:nth-child(2) a');
  }
  get profile(){
    return $('[data-testid="navbar"] li:nth-child(3) a');
  }
  get membership(){
    return $('[data-testid="navbar"] li:nth-child(4) a');
  }
  get schedule(){
    return $('[data-testid="navbar"] li:nth-child(5) a');
  }
  async homeClick(){
    await this.home.click();
  }
  async activityClick(){
    await this.activity.click();
  }
  async profileClick(){
    await this.profile.click();
  }
  async membershipClick(){
    await this.membership.click();
  }
  async scheduleClick(){
    await this.schedule.click();
  }
}

module.exports = new MemberNavbar();