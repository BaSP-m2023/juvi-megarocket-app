class AdminNavbar {
  get home(){
    return $('[data-testid="navbar"] li:nth-child(1) a');
  }
  get activity(){
    return $('[data-testid="navbar"] li:nth-child(2) a');
  }
  get profile(){
    return $('[data-testid="navbar"] li:nth-child(3) a');
  }
  get members(){
    return $('[data-testid="navbar"] li:nth-child(4) a');
  }
  get trainers(){
    return $('[data-testid="navbar"] li:nth-child(5) a');
  }
  get subscriptions(){
    return $('[data-testid="navbar"] li:nth-child(6) a');
  }
  get classes(){
    return $('[data-testid="navbar"] li:nth-child(7) a');
  }
  async activityClick () {
    await this.activity.click();
  }
}

module.exports = new AdminNavbar();