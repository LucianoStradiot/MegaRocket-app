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
        browser.url('https://joaco-megarocket-app.vercel.app/');
        browser.setWindowSize(1909, 1027);
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

    it('Verifies elements in table', async () => {
        await Trainer.filterTable.scrollIntoView();
        await expect(Trainer.filterTable).toBeDisplayed();
        await expect(Trainer.filterTable).toBeClickable();
        await expect(Trainer.filterTable).toHaveAttribute('placeholder', 'Search by activity or trainer');

        await expect(Trainer.helperTable[0]).toHaveTextContaining('Available');
        await expect(Trainer.helperTable[1]).toHaveTextContaining('Your classes');

        await expect(Trainer.headersTable[1]).toHaveTextContaining('Monday');
        await expect(Trainer.headersTable[2]).toHaveTextContaining('Tuesday');
        await expect(Trainer.headersTable[3]).toHaveTextContaining('Wednesday');
        await expect(Trainer.headersTable[4]).toHaveTextContaining('Thursday');
        await expect(Trainer.headersTable[5]).toHaveTextContaining('Friday');
        await expect(Trainer.headersTable[6]).toHaveTextContaining('Saturday');

        await expect(Trainer.hoursTable[0]).toHaveTextContaining('09:00');
        await expect(Trainer.hoursTable[1]).toHaveTextContaining('10:00');
        await expect(Trainer.hoursTable[2]).toHaveTextContaining('11:00');
        await expect(Trainer.hoursTable[3]).toHaveTextContaining('12:00');
        await expect(Trainer.hoursTable[4]).toHaveTextContaining('13:00');
        await expect(Trainer.hoursTable[5]).toHaveTextContaining('14:00');

        await Trainer.hoursTable[12].scrollIntoView();

        await expect(Trainer.hoursTable[6]).toHaveTextContaining('15:00');
        await expect(Trainer.hoursTable[7]).toHaveTextContaining('16:00');
        await expect(Trainer.hoursTable[8]).toHaveTextContaining('17:00');
        await expect(Trainer.hoursTable[9]).toHaveTextContaining('18:00');
        await expect(Trainer.hoursTable[10]).toHaveTextContaining('19:00');
        await expect(Trainer.hoursTable[11]).toHaveTextContaining('20:00');
        await expect(Trainer.hoursTable[12]).toHaveTextContaining('21:00');
    });

    it('Verifies functionalities on table', async () => {
        await expect(Trainer.cardsClass).toBeDisplayed();

        await expect(Trainer.buttonsCards).toBeClickable();
        await expect(Trainer.descriptionsCards).toBeDisplayed();

        await expect(Trainer.descriptionsCards[0]).toHaveTextContaining('Activity: spinning');
        await expect(Trainer.descriptionsCards[1]).toHaveTextContaining('Trainer: trainer trainer');

        await Trainer.buttonsCards[0].click();

        await Modals.modalSuccess.toBeDisplayed();
        await Modals.modalSuccessTitle.toBeDisplayed();
        await Modals.modalSuccessTitle.toHaveTextContaining('These are the registered members');
        await Modals.acceptButtonModal.click();
    });
});