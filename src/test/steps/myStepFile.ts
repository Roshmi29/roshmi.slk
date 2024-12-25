import { Given, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";

import registrationPage from "../../pages/registration";



let register: registrationPage;


//scenario 2
Given('I am on the BookCart website', async function () {
    register = new registrationPage(fixture.page);
    await register.navigateToMyPage();
});
When('I enter {string},{string},{string},{string},{string} button and click on register', async function (firstName: string, lastName: string, username: string, password: string, confirmPassword: string) {
    register = new registrationPage(fixture.page);
    await register.eneterDetails(firstName, lastName, username, password, confirmPassword);
});
Then('I should see the message {string}', async function (message: string) {
    register = new registrationPage(fixture.page);
    await register.valuateMyPage(message);
});