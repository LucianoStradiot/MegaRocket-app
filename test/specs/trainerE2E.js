/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const Header = require('../pageobjects/headerTest.js');
const HomePage = require('../pageobjects/homePage.js');
const Login = require('../pageobjects/loginTest.js');
const Trainer = require('../pageobjects/trainer.js');
const Modals = require('../pageobjects/modalsPage.js');
const Footer = require('../pageobjects/footerTest.js');

const firstName = 'Lautaro';
const lastName = 'Vercell';
const dni = '38790999';
const phone = '1128779098';
const email = 'trainertest@gmail.com';
const city = 'Rosario';
const salary = '333';

const lastNameU = 'Vercellini';
const dniU = '38999000';
const phoneU = '1129009987';
const cityU = 'Santa Fe';

describe('Trainer e2e', () => {
    beforeAll('open browser', () => {
        browser.url('https://joaco-megarocket-app.vercel.app/auth/login');
        browser.setWindowSize(2100, 1200);
    });

    it('Trainer Login', async () => {
        await Login.logIn('trainertest@gmail.com', 'Test2023');
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
        await expect(Header.title).toHaveTextContaining(`${firstName} ${lastName}`);
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

        await expect(HomePage.contactButton).toBeDisplayed();
        await expect(HomePage.contactButton).toBeClickable();

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

        await expect(Trainer.helperTable[0]).toHaveTextContaining('Not assigned');
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

    it('Verifies functionalities on card class of test trainer', async () => {
        await Trainer.hoursTable[0].scrollIntoView();
        await Trainer.filterTable.setValue('lau');

        await expect(Trainer.cardsClass).toBeDisplayed();

        await expect(Trainer.buttonsCards).toBeClickable();
        await expect(Trainer.descriptionsCards).toBeDisplayed();

        await expect(Trainer.descriptionsCards[1]).toHaveTextContaining(`Trainer: ${firstName} ${lastName}`);

        await Trainer.buttonsCards[0].click();

        await expect(Modals.modalSuccess).toBeDisplayed();
        await expect(Modals.modalSuccessTitle).toBeDisplayed();
        await expect(Modals.modalSuccessTitle).toHaveTextContaining('These are the registered members');
        if(await Modals.modalSuccessDescp) {
            await expect(Modals.modalSuccessDescp).toBeDisplayed();
        }
        await Modals.acceptButtonModal.click();
        await Trainer.profileButton.click();
    });

    it('Verifies elements and information in edit form', async () => {
        await Trainer.editButton.scrollIntoView();
        await Trainer.editButton.click();

        await expect(Trainer.editForm).toBeDisplayed();

        await expect(Trainer.labelsEditForm[0]).toHaveText('First name');
        await expect(Trainer.inpustEditForm[0]).toHaveValue(`${firstName}`);

        await expect(Trainer.labelsEditForm[1]).toHaveText('Last name');
        await expect(Trainer.inpustEditForm[1]).toHaveValue(`${lastName}`);

        await expect(Trainer.labelsEditForm[2]).toHaveText('DNI');
        await expect(Trainer.inpustEditForm[2]).toHaveValue(`${dni}`);

        await expect(Trainer.labelsEditForm[3]).toHaveText('Phone');
        await expect(Trainer.inpustEditForm[3]).toHaveValue(`${phone}`);

        await expect(Trainer.labelsEditForm[4]).toHaveText('City');
        await expect(Trainer.inpustEditForm[4]).toHaveValue(`${city}`);


        await expect(Trainer.cancelButton).toBeDisplayed();
        await expect(Trainer.cancelButton).toBeClickable();

        await expect(Trainer.saveButton).toBeDisplayed();
        await expect(Trainer.saveButton).toBeClickable();
    });

    it('Verifies errors message in form', async () => {
        await Trainer.CompleteFormEdit('trainer01', 'trainer01', '11289', '112988.99.', 'Rosario01');

        await expect(Trainer.errorMsgEditForm[0]).toHaveTextContaining('First name must contain letters only');
        await expect(Trainer.errorMsgEditForm[1]).toHaveTextContaining('Last name must contain letters only');
        await expect(Trainer.errorMsgEditForm[2]).toHaveTextContaining('DNI must have 7-9 digits');
        await expect(Trainer.errorMsgEditForm[3]).toHaveTextContaining('Phone number must be only numbers');
        await expect(Trainer.errorMsgEditForm[4]).toHaveTextContaining('City must contain letters and spaces only');
    });

    it('Edit trainer succesfully and verifies information in profile', async () => {
        await Trainer.CompleteFormEdit(`${firstName}`, `${lastNameU}`, `${dniU}`, `${phoneU}`, `${cityU}`);

        await expect(Modals.modalSuccessTitle).toBeDisplayed();
        await expect(Modals.modalSuccessTitle).toHaveTextContaining('Success!');
        await expect(Modals.modalSuccessDescp).toHaveTextContaining('Trainer was updated succesfully!');
        await expect(Modals.acceptButtonModal).toBeDisplayed();
        await expect(Modals.acceptButtonModal).toBeClickable();

        await Modals.acceptButtonModal.click();

        await expect(Header.title).toHaveTextContaining(`${firstName} ${lastNameU}`);
    });

    it('Logout Trainer', async () => {
        await Trainer.logoutButton.click();

        await Modals.modalConfirm.waitForDisplayed();

        await expect(Modals.modalConfirm).toBeDisplayed();
        await expect(Modals.modalConfirmTitle).toHaveText('Confirm');
        await expect(Modals.modalConfirmDesc).toHaveTextContaining('Are you sure you want to logout?');
        await expect(Modals.confirmButtonModal).toBeDisplayed();
        await expect(Modals.confirmButtonModal).toBeClickable();
        await expect(Modals.cancelButtonModal).toBeDisplayed();
        await expect(Modals.cancelButtonModal).toBeClickable();

        await Modals.confirmButtonModal.click();

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/');
    });
});