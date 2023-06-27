const ClassesTable = require('../../test/pageObjects/admin/classes/classesTable.js');

describe('Verify title page', () => {
  beforeAll('Open browser', () => {
    browser.setWindowSize(1440, 1024);
    browser.url('https://juvi-megarocket-app.vercel.app/admins/classes');
  });

  it('Veirfy title', async () => {
    await expect(ClassesTable.titlePage).toBeDisplayed();
  });
});
