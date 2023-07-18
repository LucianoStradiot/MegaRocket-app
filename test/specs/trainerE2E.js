/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const Header = require('../pageobjects/headerTest.js');
const HomePage = require('../pageobjects/homePage.js');
const Login = require('../pageobjects/loginTest.js');
const Trainer = require('../pageobjects/trainer.js');
const Modals = require('../pageobjects/modals.js');
const Footer = require('../pageobjects/footerTest.js');

describe('Check elements in Home Page', () => {
    beforeAll('open browser', () => {
        browser.setWindowSize(1909, 1027);
        browser.url('https://joaco-megarocket-app.vercel.app/');
    });

    it('Trainer Login', async () => {
        await HomePage.loginButton.click();
        browser.pause(100000);
        await Login.logIn('trainer@gmail.com', 'Trainer123');

        await Modals.acceptButtonModal.click();
    });

    it('Check if the token is generated successfully', async() => {
        const token = await browser.execute(() => {
        return window.sessionStorage.getItem('token');
        });
        const role = await browser.execute(() => {
        return window.sessionStorage.getItem('role');
        });
        const firebaseUid = await browser.execute(() => {
        return window.sessionStorage.getItem('firebaseUid');
        });
        expect(token).toBeDefined();
        expect(firebaseUid).toBeDefined();
        expect(role).toBe('TRAINER');

        const trainerUrl = await browser.getUrl();
        expect(trainerUrl).toEqual('https://joaco-megarocket-app.vercel.app/schedule');
    });

    it('Verifies elements in header, sidebar and footer', async () => {
        await expect(Header.profileImage).toBeDisplayed();
        await expect(Header.title).toHaveTextContaining('trainer trainer');
        await expect(Header.logo).toBeDisplayed();

        await expect(Trainer.profileButton).toBeDisplayed();
        await expect(Trainer.profileButton).toBeClickable();

        await expect(Trainer.logoutButton).toBeDisplayed();
        await expect(Trainer.logoutButton).toBeClickable();

        await expect(HomePage.homeButton).toBeDisplayed();
        await expect(HomePage.homeButton).toBeClickable();

        await expect(HomePage.activitiesButton).toBeDisplayed();
        await expect(HomePage.activitiesButton).toBeClickable();

        await expect(HomePage.scheduleButton).toBeDisplayed();
        await expect(HomePage.scheduleButton).toBeClickable();

        await expect(HomePage.membershipsButton).toBeDisplayed();
        await expect(HomePage.membershipsButton).toBeClickable();

        await Footer.logo.scrollIntoView();
        await expect(Footer.logo).toBeDisplayed();
        await expect(Footer.logo).toHaveAttribute('src', '/assets/images/logo-footer2.png');

        await expect(Footer.facebookIcon).toBeDisplayed();
        await expect(Footer.facebookLink).toBeClickable();

        await expect(Footer.instagramIcon).toBeDisplayed();
        await expect(Footer.instagramLink).toBeClickable();

        await expect(Footer.twitterIcon).toBeDisplayed();
        await expect(Footer.twitterLink).toBeClickable();
    });


});