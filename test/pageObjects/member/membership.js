class Membership {

  get memebershipNavbar(){
    return $('[data-testid="navbar"] li:nth-child(4)');
  }

  get membershipScreen(){
    return $('[data-testid="member-membership-screen"]');
  }

  get membershipCardClassic(){
    return $('[data-testid="member-membership-screen"] div div:nth-child(2)');
  }

  get membershipCardClassickList(){
    return $('[data-testid="member-membership-screen"] div div:nth-child(2) ul');
  }

  async memebershipNavbarClick(){
    await this.memebershipNavbar.click();
  }

  async membershipCardClassicClick(){
    await this.membershipCardClassic.click();
  }
}

module.exports = new Membership();