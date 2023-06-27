import NavBarAdmin from '../pageobjects/menuAdminPage.js';
import ActivitiesAdmin from '../pageobjects/actAdminPage.js';
import ClassesAdmin from '../pageobjects/classAdminPage.js';

describe('Check Login application for "Admins_User"', () => {

    beforeAll('open browser', () => {
        browser.url('https://joaco-megarocket-app.vercel.app/admins');
    });

    it('Display elements for menu', async () => {
        await expect(NavBarAdmin.activitiesButton).toBeDisplayed();
        await expect(NavBarAdmin.activitiesButton).toBeClickable();
        await expect(NavBarAdmin.classesButton).toBeDisplayed();
        await expect(NavBarAdmin.classesButton).toBeClickable();
        await expect(NavBarAdmin.membersButton).toBeDisplayed();
        await expect(NavBarAdmin.membersButton).toBeClickable();
        await expect(NavBarAdmin.subscriptionsButton).toBeDisplayed();
        await expect(NavBarAdmin.subscriptionsButton).toBeClickable();
        await expect(NavBarAdmin.trainersButton).toBeDisplayed();
        await expect(NavBarAdmin.trainersButton).toBeClickable();
    });
    it('Activities flow', async () => {
      await NavBarAdmin.activityClick();
      await expect(ActivitiesAdmin.buttonCreateActivities).toBeDisplayed();
      await expect(ActivitiesAdmin.buttonCreateActivities).toBeClickable();
      await ActivitiesAdmin.createActClick();
      await expect(ActivitiesAdmin.formActivities).toBeDisplayed();
      await expect(ActivitiesAdmin.containerInputName).toBeDisplayed();
      await expect(ActivitiesAdmin.containerInputDescription).toBeDisplayed();
      await expect(ActivitiesAdmin.cancelButtonAct).toBeDisplayed();
      await expect(ActivitiesAdmin.resetButtonAct).toBeDisplayed();
      await expect(ActivitiesAdmin.addButtonAct).toBeDisplayed();
      await ActivitiesAdmin.fillContainerInputName('Te');
      await ActivitiesAdmin.fillContainerInputDescription('Test');
      await ActivitiesAdmin.addActClick();
      await expect(ActivitiesAdmin.errorMsgName).toBeDisplayed();
      await expect(ActivitiesAdmin.errorMsgName).toHaveTextContaining('Activity name can´t be shorter than 3 characters');
      await expect(ActivitiesAdmin.errorMsgDescription).toBeDisplayed();
      await expect(ActivitiesAdmin.errorMsgDescription).toHaveTextContaining('The description can´t be shorter than 40 characters');
      await ActivitiesAdmin.fillContainerInputName('Test');
      await ActivitiesAdmin.fillContainerInputDescription('TestTestTestTestTestTestTestTestTestTestTest');
      await ActivitiesAdmin.addActClick();
      await expect(ActivitiesAdmin.modalSuccess).toBeDisplayed();
      await expect(ActivitiesAdmin.modalSuccessTitle).toBeDisplayed();
      await expect(ActivitiesAdmin.modalSuccessTitle).toHaveTextContaining('Success!');
      await expect(ActivitiesAdmin.acceptButtonAct).toBeDisplayed();
      await ActivitiesAdmin.acceptActClick();
      await expect(ActivitiesAdmin.editButtonAct).toBeDisplayed();
      await ActivitiesAdmin.editActClick();
      await expect(ActivitiesAdmin.formActivities).toBeDisplayed();
      await expect(ActivitiesAdmin.containerInputName).toBeDisplayed();
      await expect(ActivitiesAdmin.containerInputDescription).toBeDisplayed();
      await ActivitiesAdmin.fillContainerInputDescription('TestingTestingTestingTestingTestingTestingTestingTesting');
      await expect(ActivitiesAdmin.cancelButtonAct).toBeDisplayed();
      await expect(ActivitiesAdmin.resetButtonAct).toBeDisplayed();
      await expect(ActivitiesAdmin.saveButtonAct).toBeDisplayed();
      await ActivitiesAdmin.saveActClick();
      await expect(ActivitiesAdmin.modalSuccess).toBeDisplayed();
      await expect(ActivitiesAdmin.modalSuccessTitle).toBeDisplayed();
      await expect(ActivitiesAdmin.modalSuccessTitle).toHaveTextContaining('Success!');
      await expect(ActivitiesAdmin.acceptButtonAct).toBeDisplayed();
      await ActivitiesAdmin.acceptActClick();
      await expect(ActivitiesAdmin.editButtonAct).toBeDisplayed();
      await ActivitiesAdmin.deleteActClick();
  });

});