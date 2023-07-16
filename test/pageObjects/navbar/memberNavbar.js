class MemberNavbar {
  get navbarHome(){
    return $('[data-testid="navbar"] li:nth-child(1) a');
  }
  get navbarActivity(){
    return $('[data-testid="navbar"] li:nth-child(2) a');
  }
  get navbarProfile(){
    return $('[data-testid="navbar"] li:nth-child(3) a');
  }
  get navbarMembership(){
    return $('[data-testid="navbar"] li:nth-child(4) a');
  }
  get navbarSchedule(){
    return $('[data-testid="navbar"] li:nth-child(5) a');
  }
  async navbarHomeClick(){
    await this.navbarHome.click();
  }
  async navbarActivityClick(){
    await this.navbarActivity.click();
  }
  async navbarProfileClick(){
    await this.navbarProfile.click();
  }
  async navbarMembershipClick(){
    await this.navbarMembership.click();
  }
  async navbarScheduleClick(){
    await this.navbarSchedule.click();
  }
}

module.exports = new MemberNavbar();