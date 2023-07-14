const SignUpPage = require ('../pageobjects/signUp.js');

describe('Sign up flow', () => {
  it('should not let sign up with empty fields', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('', '', '', '', '', '', '', '','Choose a membership', '');
    await expect(SignUpPage.errorName).toBeDisplayed();
    await expect(SignUpPage.errorLastName).toBeDisplayed();
    await expect(SignUpPage.errorEmail).toBeDisplayed();
    await expect(SignUpPage.errorDni).toBeDisplayed();
    await expect(SignUpPage.errorPhone).toBeDisplayed();
    await expect(SignUpPage.errorCity).toBeDisplayed();
    await expect(SignUpPage.errorZip).toBeDisplayed();
    await expect(SignUpPage.errorDate).toBeDisplayed();
    await expect(SignUpPage.errorMembership).toBeDisplayed();
    await expect(SignUpPage.errorPassword).toBeDisplayed();
  });
  it('should not let sign up with empty name and last name', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('', '', 'testing@a.com', '22345678', '2345678912', 'Montevideo', '11700', '02/04/1997','Black Membership', 'Password123');
    await expect(SignUpPage.errorName).toBeDisplayed();
    await expect(SignUpPage.errorLastName).toBeDisplayed();
  });
  it('should not let sign up with invalid mail and dni', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Member', 'Fortest', 'invalid', 'invalid', '2234567891', 'Montevideo', '11700', '02/04/1997','Black Membership','Password123');
    await expect(SignUpPage.errorEmail).toBeDisplayed();
    await expect(SignUpPage.errorDni).toBeDisplayed();
  });
  it('should not let sign up with invalid phone and city', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Member', 'Fortest', 'testing@gmail.com', '4947558', 'invalid', '0', '11700', '02/04/1997','Black Membership', 'Password123');
    await expect(SignUpPage.errorEmail).toBeDisplayed();
    await expect(SignUpPage.errorDni).toBeDisplayed();
  });
  it('should not let sign up with invalid password', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Member', 'Fortest', 'testing@gmail.com', '5947553', '1234567891', '0', '11700', '02/04/1997','Black Membership', 'invalid');
    await expect(SignUpPage.errorEmail).toBeDisplayed();
    await expect(SignUpPage.errorDni).toBeDisplayed();
  });
  it('should not let sign up with existing user', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Member', 'Fortest', 'katt@gmail.com', '4947558', '1234567891', 'Montevideo', '11700', '02/04/1997','Black Membership', 'Password123');
    await expect(SignUpPage.modal).toBeDisplayed();
    await SignUpPage.acceptBtn.click();
  });
  it('It should add a member with valid info', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Member', 'Fortest', 'testing@gmail.com', '5947553', '2234567891', 'Montevideo', '11700', '2/2/1997','Black Membership', 'Testing123456');
    await expect(SignUpPage.modal).toBeDisplayed();
    await SignUpPage.acceptBtn.click();
    await expect(browser).toHaveUrl(
      'https://joaco-megarocket-app.vercel.app/auth/login'
    );
  });
})