# MegaRocket Automation Tests

In this folder, all the necessary automation tests will be added to run the regression tests. The main idea is to have a quick way to test that nothing old has been broken every time a new feature is introduced.

## Disclaimers

In the future, most of these tests will be modified because a lot of new features are in coming, like the sign up feature.

## Demo

- [Link to video](https://drive.google.com/file/d/1No-PAn3C6ojd95f-n-EhosNSpR9KuVtI/view?usp=drive_link)
- [Link to allure report screens](https://drive.google.com/drive/folders/100A8FLgjX8wyT5HMkfQ7XMIdwxAhnbvX)

## Installation

To be able to run these tests, you need to do the following steps:
1) Go to your console and write "git clone https://github.com/BaSP-m2023/juvi-megarocket-server.git"
2) Enter "npm i"
3) Then, enter "git checkout FIX/MR-174/delete-some-changes"
4) Finally, set up the server with "npm start"
5) Open another console and write "git clone https://github.com/BaSP-m2023/juvi-megarocket-app.git"
6) Enter "npm ci"
7) Then, enter "git checkout feature/MR-173/automation-adminActivities-memberProfile"
8) Enter "npm start"
9) Finally, open in a new console the app, and run the following cmd
10) npx wdio
11) npm run allure-report

## Author

- [@IgnacioCanton](https://github.com/IgnacioCanton)

## Support

For support, email juanignaciocanton1@gmail.com