const HomePage = require ('../pageobjects/homePage');
const SignUpPage = require ('../pageobjects/signUp.js');
const Modals = require ('../pageobjects/modalsPage.js');

describe('Sign up flow', () => {
  it('Should redirect to sign up page', async () => {
    await HomePage.open();
    await HomePage.signUpButton.click();
    await expect(browser).toHaveUrl(
      'https://joaco-megarocket-app.vercel.app/signUp'
    );
  });
  it('should not let sign up with empty fields', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('', '', '', '', '', '', '', '','Choose a membership', '');
    await expect(SignUpPage.errorName).toHaveTextContaining('First name can´t be empty');
    await expect(SignUpPage.errorLastName).toHaveTextContaining('Last name can´t be empty');
    await expect(SignUpPage.errorEmail).toHaveTextContaining('Email can´t be empty');
    await expect(SignUpPage.errorDni).toHaveTextContaining('DNI can´t be empty');
    await expect(SignUpPage.errorPhone).toHaveTextContaining('Phone number can´t be empty');
    await expect(SignUpPage.errorCity).toHaveTextContaining('City can´t be empty');
    await expect(SignUpPage.errorZip).toHaveTextContaining('Postal code can´t be empty');
    await expect(SignUpPage.errorDate).toHaveTextContaining('Invalid birth date format');
    await expect(SignUpPage.errorMembership).toHaveTextContaining('Invalid Membership');
    await expect(SignUpPage.errorPassword).toHaveTextContaining('Password can´t be empty');
  });
  it('should not let sign up with empty name and last name', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('', '', 'testing@a.com', '22345678', '2345678912', 'Montevideo', '11700', '02/04/1997','Black Membership', 'Password123');
    await expect(SignUpPage.errorName).toHaveTextContaining('First name can´t be empty');
    await expect(SignUpPage.errorLastName).toHaveTextContaining('Last name can´t be empty');
  });
  it('should not let sign up with empty password', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Member', 'Fortest', 'testing@gmail.com', '5947553', '1234567891', '0', '11700', '02/04/1997','Black Membership', '');
    await expect(SignUpPage.errorPassword).toHaveTextContaining('Password can´t be empty');
  });
  it('should not let sign up with empty dni or email', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Member', 'Fortest', '', '', '2234567891', 'Montevideo', '11700', '02/04/1997','Black Membership','Password123');
    await expect(SignUpPage.errorDni).toHaveTextContaining('DNI can´t be empty');
    await expect(SignUpPage.errorEmail).toHaveTextContaining('Email can´t be empty');
  });
  it('should not let sign up with invalid mail and dni', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Member', 'Fortest', 'invalid', '0', '2234567891', 'Montevideo', '11700', '02/04/1997','Black Membership','Password123');
    await expect(SignUpPage.errorEmail).toHaveTextContaining('Email must be in a valid format');
    await expect(SignUpPage.errorDni).toHaveTextContaining('DNI must have 7-9 digits');
  });
  it('should not let sign up with invalid phone and city', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Member', 'Fortest', 'testing@gmail.com', '4947558', 'invalid', '0', '11700', '02/04/1997','Black Membership', 'Password123');
    await expect(SignUpPage.errorPhone).toHaveTextContaining('Phone number must be only numbers');
    await expect(SignUpPage.errorCity).toHaveTextContaining('City must have at least 4 characters');
  });
  it('should not let sign up if we have less than 15 years old', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Member', 'Fortest', 'testing@gmail.com', '5947553', '1234567891', 'Montevideo', '11700', '02/04/2020','Black Membership', 'Password123');
    await expect(SignUpPage.errorDate).toHaveTextContaining('You must be at least 15 years old');
  });
  it('should not let sign up with invalid password', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Member', 'Fortest', 'testing@gmail.com', '5947553', '1234567891', 'Montevideo', '11700', '02/04/1997','Black Membership', 'invalid');
    await expect(SignUpPage.errorPassword).toHaveTextContaining('Password must be at least 8 characters long');
  });
  it('should not let sign up with existing user', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Katherine', 'Airala', 'kat@gmail.com', '4947559', '1234567891', 'Montevideo', '11700', '02/04/1997','Black Membership', 'Password1234');
    await expect(Modals.modalSuccessTitle).toHaveTextContaining('Error!');
    await Modals.acceptButtonModal.click();
  });
  it('It should add a member with valid info', async () => {
    await SignUpPage.openSignUpPage();
    await SignUpPage.addMember('Member', 'Fortest', 'testing@test.com', '4947533', '2234567891', 'Montevideo', '11700', '04/2/1992','Black Membership', 'Testing234567');
    await expect(Modals.modalSuccessTitle).toHaveTextContaining('Success!');
    await Modals.acceptButtonModal.click();
    await expect(browser).toHaveUrl(
      'https://joaco-megarocket-app.vercel.app/auth/login'
    );
  });
})