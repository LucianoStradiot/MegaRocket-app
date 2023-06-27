const SignUpPage = require ('../pageobjects/signUp.js');

describe('Sign up negative test cases', () => {
  it('should not let sign up with wmpty fields', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('', '', '', '', '', '', '', '','Choose a membership');
    await expect(SignUpPage.errorName).toBeDisplayed();
    await expect(SignUpPage.errorLastName).toBeDisplayed();
    await expect(SignUpPage.errorEmail).toBeDisplayed();
    await expect(SignUpPage.errorDni).toBeDisplayed();
    await expect(SignUpPage.errorPhone).toBeDisplayed();
    await expect(SignUpPage.errorCity).toBeDisplayed();
    await expect(SignUpPage.errorZip).toBeDisplayed();
    await expect(SignUpPage.errorDate).toBeDisplayed();
    await expect(SignUpPage.errorMembership).toBeDisplayed();
  });
  it('should not let sign up with empty name and last name', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('', '', 'example@a.com', '22345678', '2345678912', 'Montevideo', '11700', '02/04/1997','Black Membership');
    await expect(SignUpPage.errorName).toBeDisplayed();
    await expect(SignUpPage.errorLastName).toBeDisplayed();
  });
  it('should not let sign up with invalid mail and dni', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Katherine', 'Airala', 'invalid', 'invalid', '2234567891', 'Montevideo', '11700', '02/04/1997','Black Membership');
    await expect(SignUpPage.errorEmail).toBeDisplayed();
    await expect(SignUpPage.errorDni).toBeDisplayed();
  });
  it('should not let sign up with invalid phone and city', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Katherine', 'Airala', 'example@gmail.com', '4947558', 'invalid', '0', '11700', '02/04/1997','Black Membership');
    await expect(SignUpPage.errorEmail).toBeDisplayed();
    await expect(SignUpPage.errorDni).toBeDisplayed();
  });
  it('should not let sign up with existing user', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Katherine', 'Airala', 'kat@gmail.com', '4947558', '1234567891', 'Montevideo', '11700', '02/04/1997','Black Membership');
    await expect(SignUpPage.modal).toBeDisplayed();
    await SignUpPage.acceptBtn.click();
  });
});




describe("Sign up positive test cases", () => {
  it("It should add a member", async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Katherine', 'Airala', 'new@gmail.com', '2947558', '2234567891', 'Montevideo', '11700', '2/4/1997','Black Membership');
    await expect(SignUpPage.modal).toBeDisplayed();
    await SignUpPage.acceptBtn.click();
    await expect(browser).toHaveUrl(
      "https://joaco-megarocket-app.vercel.app/member/schedule"
    );
  });
});













