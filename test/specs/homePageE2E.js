/* eslint-disable no-undef */
const HomePage = require('../pageobjects/homePage.js');
const Header = require('../pageobjects/headerTest.js');
const Footer = require('../pageobjects/footerTest.js');

describe('Check elements in Home Page', () => {
  beforeAll('open browser', () => {
    browser.setWindowSize(1900, 1100);
    browser.url('https://joaco-megarocket-app.vercel.app/');
  });

  it('check elements in header', async () => {
    await expect(Header.logo).toBeDisplayed();
    await expect(Header.logo).toBeClickable();
    await expect(Header.logo).toHaveAttribute('src', '/assets/images/logo-header2.png');
  });

  it('check elements and functionalities in sidebar', async () => {
    await expect(HomePage.sidebarHome).toBeDisplayed();

    await expect(HomePage.loginButton).toBeDisplayed();
    await expect(HomePage.loginButton).toBeClickable();
    const loginBtn = await HomePage.loginButton.getText();
    expect(loginBtn).toEqual('Login');

    await expect(HomePage.signUpButton).toBeDisplayed();
    await expect(HomePage.signUpButton).toBeClickable();
    const signUpBtn = await HomePage.signUpButton.getText();
    expect(signUpBtn).toEqual('SignUp');

    await expect(HomePage.activitiesButton).toBeDisplayed();
    await expect(HomePage.activitiesButton).toBeClickable();
    const actBtn = await HomePage.activitiesButton.getText();
    expect(actBtn).toEqual('Activities');

    await expect(HomePage.scheduleButton).toBeDisplayed();
    await expect(HomePage.scheduleButton).toBeClickable();
    const schBtn = await HomePage.scheduleButton.getText();
    expect(schBtn).toEqual('Schedule');

    await expect(HomePage.membershipsButton).toBeDisplayed();
    await expect(HomePage.membershipsButton).toBeClickable();
    const membBtn = await HomePage.membershipsButton.getText();
    expect(membBtn).toEqual('Memberships');
  });

  it('Check text information in sidebar', async () => {
    await expect(HomePage.contactUs).toBeDisplayed();
    const contactText = await HomePage.contactUs.getText();
    expect(contactText).toEqual('Contact us');

    await expect(HomePage.contactUsEmail).toBeDisplayed();
    const infoEmail = await HomePage.contactUsEmail.getText();
    expect(infoEmail).toEqual('info@megarocket.com');

    await expect(HomePage.contactUsPhone).toBeDisplayed();
    const infoPhone = await HomePage.contactUsPhone.getText();
    expect(infoPhone).toEqual('(000)0000000');

    await expect(HomePage.contactUsAdress).toBeDisplayed();
    const infoAdress = await HomePage.contactUsAdress.getText();
    expect(infoAdress).toEqual('1234 somewhere road');
  });

  it('Check navigation from Home page to Login', async () => {
    await HomePage.loginButton.scrollIntoView();
    await HomePage.loginButton.click();

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/auth/login');

    await HomePage.cancelButtonLogin.click();
  });

  it('Check navigation from Home page to Sign Up', async () => {
    await HomePage.signUpButton.click();

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/signUp');

    await HomePage.cancelButonSignUp.click();
  });

  it('Check navigation from Home page to activities', async () => {
    await HomePage.activitiesButton.click();

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/activities');

    await HomePage.homeButton.click();
  });

  it('Check navigation from Home page to schedule', async () => {
    await HomePage.scheduleButton.click();

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/schedule');

    await HomePage.homeButton.click();
  });

  it('Check navigation from Home page to memberships', async () => {
    await HomePage.membershipsButton.click();

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/membership');

    await HomePage.homeButton.click();
  });

  it('Check elements in first section', async () => {
    await expect(HomePage.sectionOneTitle).toBeDisplayed();
    await expect(HomePage.sectionOneTitle).toHaveTextContaining('MEGA ROCKET WEB');
    const cssProperty = HomePage.sectionOneTitle.getCSSProperty('align-items');
    expect(cssProperty).toBe('center');

    await expect(HomePage.sectionOneSubTitle).toBeDisplayed();
    await expect(HomePage.sectionOneSubTitle).toHaveTextContaining('WELCOME');

    await expect(HomePage.sectionOnePharaf).toBeDisplayed();
    await expect(HomePage.sectionOneImage).toBeDisplayed();
    await expect(HomePage.sectionOneImage).toHaveAttribute('src', '/assets/images/gym-home.png');
  });

  it('Check first title and description in second section', async () => {
    await HomePage.sectitonTwoTitle.scrollIntoView();
    await expect(HomePage.sectitonTwoTitle).toBeDisplayed();
    await expect(HomePage.sectitonTwoTitle).toHaveTextContaining('Features');

    await expect(HomePage.shiftReservations).toBeDisplayed();
    await expect(HomePage.shiftReservations).toHaveText('Shift Reservations');

    await expect(HomePage.shiftReservationsDesc).toBeDisplayed();
  });

  it('Check second title and description in second section', async () => {
    await expect(HomePage.scheduling).toBeDisplayed();
    await expect(HomePage.scheduling).toHaveTextContaining('Scheduling y Opening Hours');
    await expect(HomePage.schedulingDesc).toBeDisplayed();
  });

  it('Check third title and description in second section', async () => {
    await expect(HomePage.membershipManag).toBeDisplayed();
    await expect(HomePage.membershipManag).toHaveTextContaining('Membership Management');
    await expect(HomePage.membershipManagDesc).toBeDisplayed();
  });

  it('Check fourth title and description ind second section', async () => {
    await expect(HomePage.contactSuggestions).toBeDisplayed();
    await expect(HomePage.contactSuggestions).toHaveTextContaining('Contact Form y Suggestions');
    await expect(HomePage.contactSuggestionsDesc).toBeDisplayed();
  });

  it('Check title section three', async () => {
    await HomePage.sectionThreeTitle.scrollIntoView();
    await expect(HomePage.sectionThreeTitle).toBeDisplayed();
    await expect(HomePage.sectionThreeTitle).toHaveTextContaining('About Mega Rocket');
  });

  it('Check first image and description in section three', async () => {
    await expect(HomePage.aboutFirstImg).toBeDisplayed();
    await expect(HomePage.aboutFirstImg).toHaveAttribute('src', '/assets/images/gym-about.png');
    await expect(HomePage.aboutFirstDesc).toBeDisplayed();
  });

  it('Check second image and description in section three', async () => {
    await HomePage.aboutSecondImg.scrollIntoView();
    await expect(HomePage.aboutSecondImg).toBeDisplayed();
    await expect(HomePage.aboutSecondImg).toHaveAttribute('src', '/assets/images/gym-about2.png');
    await expect(HomePage.aboutSecondDesc).toBeDisplayed();
  });

  it('Check elements and functionalities in footer', async () => {
    await Footer.logo.scrollIntoView();
    await expect(Footer.logo).toBeDisplayed();
    await expect(Footer.logo).toHaveAttribute('src', '/assets/images/logo-footer2.png');

    await expect(Footer.facebookIcon).toBeDisplayed();
    await expect(Footer.facebookIcon).toBeClickable();

    await expect(Footer.instagramIcon).toBeDisplayed();
    await expect(Footer.instagramIcon).toBeClickable();

    await expect(Footer.twitterIcon).toBeDisplayed();
    await expect(Footer.twitterIcon).toBeClickable();

    await expect(Footer.copyRigth).toBeDisplayed();
    await expect(Footer.copyRigth).toHaveTextContaining(
      'Copyright © 2023 MegaRocket SA. All rights reserved.'
    );
  });

  it('Check navigation in social media icon "Faceebok"', async () => {
    await Footer.facebookIcon.click();
    const windowHandles = await browser.getWindowHandles();

    const faceebok = windowHandles[windowHandles.length - 1];
    await browser.switchToWindow(faceebok);

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://www.facebook.com/radiumrocket');

    await browser.closeWindow();
    const originalWindowHandle = windowHandles[0];
    await browser.switchToWindow(originalWindowHandle);
  });

  it('Check navigation in social media icon "Instagram"', async () => {
    await Footer.instagramIcon.click();
    const windowHandles = await browser.getWindowHandles();

    const instagram = windowHandles[windowHandles.length - 1];
    await browser.switchToWindow(instagram);
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://www.instagram.com/radium.rocket/');

    await browser.closeWindow();
    const originalWindowHandle = windowHandles[0];
    await browser.switchToWindow(originalWindowHandle);
  });

  it('Check navigation in social media icons "Twitter"', async () => {
    await Footer.twitterIcon.click();
    const windowHandles = await browser.getWindowHandles();

    const twitter = windowHandles[windowHandles.length - 1];
    await browser.switchToWindow(twitter);

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://twitter.com/radiumrocket');

    await browser.closeWindow();

    const originalWindowHandle = windowHandles[0];
    await browser.switchToWindow(originalWindowHandle);
  });
});
