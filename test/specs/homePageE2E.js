/* eslint-disable no-undef */
const HomePage = require('../pageobjects/homePage.js');
const Header = require('../pageobjects/headerTest.js');
const Login = require('../pageobjects/loginTest.js');
const SignUp = require('../pageobjects/signUp.js');
const Footer = require('../pageobjects/footerTest.js');

describe('Check elements in Home Page', () => {
  beforeAll('open browser', () => {
    browser.setWindowSize(1900, 1100);
    browser.url('https://joaco-megarocket-app.vercel.app/');
  });

  it('check elements in header', async () => {
    await expect(Header.logo).toBeDisplayed();
    await expect(Header.logo).toHaveAttribute('src', '/assets/images/logo-header2.png');
  });

  it('check elements and functionalities in sidebar', async () => {
    await expect(HomePage.sidebarHome).toBeDisplayed();
    const cssProperty = await HomePage.sidebarHome.getCSSProperty('align-items');
    expect(cssProperty.value).toBe('center');

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

    await expect(HomePage.contactButton).toBeDisplayed();
    await expect(HomePage.contactButton).toBeClickable();
    const contactBtn = await HomePage.contactButton.getText();
    expect(contactBtn).toEqual('Contact');
  });

  it('Check navigation from Home page to Login', async () => {
    await HomePage.loginButton.scrollIntoView();
    await HomePage.loginButton.click();

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/auth/login');

    await Login.cancelButton.click();
  });

  it('Check navigation from Home page to Sign Up', async () => {
    await HomePage.signUpButton.click();

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/signUp');

    await SignUp.cancelBtn.click();
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

  it('Check navigation from Home page to contact page', async () => {
    await HomePage.contactButton.click();

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/contact');

    await HomePage.homeButton.click();
  });

  it('Verifies carousel slides are displayed', async () => {
    const slidesLength = await HomePage.slides.map((element) => element);
    expect(slidesLength.length).toEqual(5);
  });

  it('Verifies if carousel is displayed and elements', async () => {
    await expect(HomePage.carouselRoot).toBeDisplayed();
    await expect(HomePage.carouselSlidesTitles).toBeElementsArrayOfSize({ gte: 3 });
  });

  it('Verifies carousel navigation buttons and texts', async () => {
    await HomePage.carouselRoot.scrollIntoView();
    await HomePage.carouselSlidesTitles[0].waitForDisplayed();
    browser.pause(5000);

    await expect(HomePage.carouselSlidesTitles[0]).toBeDisplayed();
    await expect(HomePage.carouselSlidesDesc[0]).toBeDisplayed();
    await expect(HomePage.carouselSlidesTitles[0]).toHaveTextContaining('Join us');
    await expect(HomePage.carouselSlidesDesc[0]).toHaveTextContaining(
      'Join our gym, unleash your potential! Get expert guidance, state-of-the-art facilities, and a supportive community. Take the first step towards a healthier you. Join now!'
    );
    await HomePage.carouselControlNext.click();

    await HomePage.carouselSlidesTitles[1].waitForDisplayed();
    browser.pause(5000);

    await expect(HomePage.carouselSlidesTitles[1]).toBeDisplayed();
    await expect(HomePage.carouselSlidesDesc[1]).toBeDisplayed();
    await expect(HomePage.carouselSlidesTitles[1]).toHaveTextContaining('Welcome');
    await expect(HomePage.carouselSlidesDesc[1]).toHaveTextContaining(
      'Mega Rocket web is a monthly management system for members and trainers so that they can dynamically sign up for their activities in the gym'
    );

    await HomePage.carouselControlNext.click();

    await HomePage.carouselSlidesTitles[2].waitForDisplayed();

    await expect(HomePage.carouselSlidesTitles[2]).toBeDisplayed();
    await expect(HomePage.carouselSlidesDesc[2]).toBeDisplayed();
    await expect(HomePage.carouselSlidesTitles[2]).toHaveTextContaining('About');
    await expect(HomePage.carouselSlidesDesc[2]).toHaveTextContaining(
      'Since 1965, no gym has been responsible for more life-changing transformations and fitness achievements than Mega Rocket.'
    );
  });

  it('Check elements and functionalities in footer', async () => {
    await Footer.logo.scrollIntoView();
    await expect(Footer.logo).toBeDisplayed();
    await expect(Footer.logo).toHaveAttribute('src', '/assets/images/logo-footer2.png');

    await expect(Footer.facebookIcon).toBeDisplayed();
    await expect(Footer.facebookLink).toBeClickable();

    await expect(Footer.instagramIcon).toBeDisplayed();
    await expect(Footer.instagramLink).toBeClickable();

    await expect(Footer.twitterIcon).toBeDisplayed();
    await expect(Footer.twitterLink).toBeClickable();

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
    expect(currentUrl).toEqual(
      'https://twitter.com/i/flow/login?redirect_after_login=%2Fradiumrocket'
    );

    await browser.closeWindow();

    const originalWindowHandle = windowHandles[0];
    await browser.switchToWindow(originalWindowHandle);
  });
});
