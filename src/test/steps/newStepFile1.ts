import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import HomePage from "../../pages/homePage";


let homePage: HomePage;
setDefaultTimeout(60 * 1000 * 2)

Given('user navigates to the application', async function () {
    // await fixture.page.goto(process.env.BASEURL);
    // fixture.logger.info("Navigated to the application")
    // await fixture.page.waitForTimeout(5000);


    await fixture.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');




    await fixture.page.getByPlaceholder('Username').fill('Admin');
    await fixture.page.getByPlaceholder('Password').click();
    await fixture.page.getByPlaceholder('Password').fill('admin123');
    await fixture.page.getByRole('button', { name: 'Login' }).click();
    await fixture.page.getByRole('heading', { name: 'Dashboard' }).isVisible();
    





})

// Given('User click on the login link', async function () {
//      await fixture.page.locator("//button").click();
//     // homePage = new HomePage();
//     // await homePage.goToHomePage();
// });

Given('Use enters the username as {string}', async function (username) {
    await fixture.page.locator(`//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input`).type(username);
    await fixture.page.waitForTimeout(2000);
});

Given('User enters the password as {string}', async function (password) {
    await fixture.page.locator(`//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[2]/div/div[2]/input`).type(password);
    await fixture.page.waitForTimeout(2000);
})

When('User click roshmi on the login button', async function () {
    //await fixture. page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await fixture.page.getByRole('button', { name: 'Login' }).click();
    //await fixture.page.waitForLoadState();
   // fixture.logger.info("Waiting for 2 seconds")
  //  await fixture.page.waitForTimeout(2000);
});


Then('Login should run be success', async function () {
    // const user = fixture.page.locator(`//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button`);
    // await expect(user).toBeVisible();
    // const userName = await user.textContent();
    // console.log("Username: " + userName);
    // fixture.logger.info("Username: " + userName);

    await fixture.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await fixture.page.getByText('Reset your password?').click();
    if(await fixture.page.getByRole('heading', { name: 'Reset your Password' }).isVisible()){
        console.log("Forgot Password page is visible");
    }
    else{
        
        console.log("Reset Password page is not visible");
    }
    await fixture.page.getByPlaceholder('Username').click();
    await fixture.page.getByPlaceholder('Username').fill('admin');
    await fixture.page.getByRole('button', { name: 'Reset Password' }).click();
    if(await fixture.page.getByRole('heading', { name: 'Reset Password link sent' }).isVisible()){
        console.log("Reset Password link sent page is visible");
    }
    else{
        await fixture.page.getByRole('button', { name: 'Forgot your  Password' }).click();
        await expect(fixture.page.getByRole('heading', { name: 'Forgot your Password link sent' })).toBeVisible();
  
        console.log("Reset Password link sent page is not visible");
    }
})

When('Login should fail', async function () {
     const failureMesssage = fixture.page.locator("//*[@id=`app`]/div[1]/div/div[1]/div/div[2]/div[2]/div/div[1]/div[1]");
     await expect(failureMesssage).toBeVisible();
    
  
  
});

Given('User navigates to the forgot password page', async function () {
    await fixture.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
    await fixture.page.getByRole('heading', { name: 'Reset Password' }).isVisible();
});

When('User enters the username for password reset as {string}', async function (username) {
    await fixture.page.getByPlaceholder('Username').fill(username);
    await fixture.page.getByRole('button', { name: 'Reset Password' }).click();
});

Then('A reset password link should be sent', async function () {
    await expect(fixture.page.getByRole('heading', { name: 'Reset Password link sent' })).toBeVisible();
});

Then('User should see the dashboard', async function () {
    await expect(fixture.page.locator('h1')).toHaveText('Dashboard');
    await expect(fixture.page.locator('.user-info')).toBeVisible();
    await expect(fixture.page.locator('.user-stats')).toBeVisible();
    await expect(fixture.page.locator('.recent-activities')).toBeVisible();
});


//login 3 
Given('User clicks on the Shehan user span', async function () {
    await fixture.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await fixture.page.locator('span').filter({ hasText: 'Shehan user' }).click();
});

When('User clicks on AboutSupportChange', async function () {
    await fixture.page.getByText('About').click();
    await fixture.page.getByText('Support').click();
    await fixture.page.getByText('Change').click();
});

Then('The AboutSupportChange section should be visible', async function () {
    await expect(fixture.page.getByText('About')).toBeVisible();
    await expect(fixture.page.getByText('Support')).toBeVisible();
    await expect(fixture.page.getByText('Change')).toBeVisible();
});

Given('I am on the home page', async function () {
    await fixture.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
});

When('I navigate to the {string} section', async function (sectionName: string) {
    await fixture.page.getByLabel('Sidepanel').locator('div').filter({ hasText: sectionName }).click();
});

Then('I should see the {string} section', async function (sectionName: string) {
    const section = await fixture.page.getByLabel('Sidepanel').locator('div').filter({ hasText: sectionName });
    expect(await section.isVisible()).toBe(true);
});





Given('User is logged in and on the Leave section', async function () {
    //await fixture.page.getByRole('button', { name: 'Login' }).click();
    await fixture.page.getByRole('link', { name: 'Leave' }).click();
});

When('User clicks on Apply', async function () {
    await fixture.page.locator('li').filter({ hasText: 'Apply' }).click();
});

Then('User should see the Apply Leave form', async function () {
    await expect(fixture.page.getByRole('heading', { name: 'Apply Leave' })).toBeVisible();
});


// Given('User is logged in and on the the Leave section', async function () {
//     await fixture.page.getByRole('button', { name: 'Login' }).click();
//     await fixture.page.getByRole('link', { name: 'Leave' }).click();
// });

// When('User clicks on Apply', async function () {
//     await fixture.page.getByRole('button', { name: 'Apply' }).click();
// });

// Then('User should see the Apply Leave form', async function () {
//     await expect(fixture.page.getByRole('heading', { name: 'Apply Leave' })).toBeVisible();
// });

Given('User is on the Apply Leave form', async function () {
    await fixture.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/applyLeave');
    await expect(fixture.page.getByRole('heading', { name: 'Apply Leave' })).toBeVisible();
});

When('User selects leave type and dates', async function () {
    await fixture.page.locator('form i').first().click();
    await fixture.page.getByRole('option', { name: 'CAN - FMLA' }).click();
    await fixture.page.locator('form i').nth(2).click();
    await fixture.page.getByText('6', { exact: true }).click();
    await fixture.page.locator('form i').nth(3).click();
    await fixture.page.getByText('7', { exact: true }).click();
});

When('User fills in the reason for leave', async function () {
    await fixture.page.locator('textarea').click();
    await fixture.page.locator('textarea').fill('sickness');
});

Then('User submits the leave application', async function () {
    await fixture.page.getByRole('button', { name: 'Apply' }).click();
});



Given('User is on the Leave List page', async function () {
    await fixture.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList');
    await expect(fixture.page.getByRole('heading', { name: 'Leave List' })).toBeVisible();
});

When('User selects the leave dates and type', async function () {
    await fixture.page.locator('.oxd-date-input > .oxd-icon').first().click();
    await fixture.page.getByText('9', { exact: true }).click();
    await fixture.page.locator('div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon').click();
    await fixture.page.getByText('9', { exact: true }).click();
    await fixture.page.locator('.oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').first().click();
    await fixture.page.getByRole('option', { name: 'CAN - FMLA' }).click();
});

When('User searches for leave requests', async function () {
    await fixture.page.getByRole('button', { name: 'Search' }).click();
    await fixture.page.locator('.oxd-select-text--after > .oxd-icon').first().click();
    await fixture.page.getByText('Pending Approval', { exact: true }).click();
    await fixture.page.getByRole('button', { name: 'Search' }).click();
});

Then('User should see the leave requests', async function () {
    await expect(fixture.page.locator('.oxd-table')).toBeVisible();
});


Given('User is on the Leave List page and performs various actions', async function () {
    await fixture.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList');
    await expect(fixture.page.getByRole('heading', { name: 'Leave List' })).toBeVisible();
});

When('User selects leave dates and types, and performs searches', async function () {
    await fixture.page.locator('.oxd-date-input > .oxd-icon').first().click();
    await fixture.page.getByText('20', { exact: true }).click();
    await fixture.page.locator('div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon').click();
    await fixture.page.getByText('25', { exact: true }).click();
    await fixture.page.locator('span').filter({ hasText: 'Cancelled' }).locator('i').click();
    await fixture.page.locator('span').filter({ hasText: 'Rejected' }).locator('i').click();
    await fixture.page.getByText('-- Select --').click();
    await fixture.page.getByRole('option', { name: 'CAN - FMLA' }).locator('span').click();
    await fixture.page.getByRole('button', { name: 'Search' }).click();
    await fixture.page.locator('div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon').click();
    await fixture.page.getByText('24', { exact: true }).click();
    await fixture.page.getByRole('button', { name: 'Search' }).click();
    await fixture.page.locator('span').filter({ hasText: 'Taken' }).locator('i').click();
    await fixture.page.locator('span').filter({ hasText: 'Scheduled' }).locator('i').click();
    await fixture.page.getByRole('button', { name: 'Search' }).click();
});

Then('User should see the leave requests and perform actions on them', async function () {
    await fixture.page.getByRole('row', { name: ' 2025-20-01 to 2025-24-01' }).locator('span i').click();
    await fixture.page.getByRole('row', { name: ' 2025-20-01 to 2025-24-01' }).getByRole('listitem').getByRole('button').click();
    await fixture.page.locator('.orangehrm-bottom-container').click();
});





// Given('User is on the Leave List page and selects specific leave dates', async function () {
//     await fixture.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList');
//     await expect(fixture.page.getByRole('heading', { name: 'Leave List' })).toBeVisible();
// });

// When('User selects leave dates and types, and performs searches for specific dates', async function () {
//     await fixture.page.locator('.oxd-date-input > .oxd-icon').first().click();
//     await fixture.page.getByText('28', { exact: true }).click();
//     await fixture.page.locator('div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon').click();
//     await fixture.page.getByText('29', { exact: true }).click();
//     await fixture.page.locator('div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon').click();
//     await fixture.page.getByText('December').click();
//     await fixture.page.getByText('January').click();
//     await fixture.page.getByText('28', { exact: true }).click();
//     await fixture.page.locator('div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon').click();
//     await fixture.page.getByText('29', { exact: true }).click();
//     await fixture.page.locator('.oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
//     await fixture.page.getByRole('option', { name: 'CAN - FMLA' }).click();
//     await fixture.page.getByRole('button', { name: 'Search' }).click();
// });

// Then('User should see the leave requests for the selected dates', async function () {
//     await expect(fixture.page.getByRole('cell', { name: '' }).locator('i')).toBeVisible();
// });



// Given('User is on the Leave List page and selects specific leave dates', async function () {
//     await fixture.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList');
//     await expect(fixture.page.getByRole('heading', { name: 'Leave List' })).toBeVisible();
// });

// When('User selects leave dates {string} to {string} and types, and performs searches for specific dates', async function (startDate: string, endDate: string) {
//     await fixture.page.locator('.oxd-date-input > .oxd-icon').first().click();
//     await fixture.page.getByText(startDate, { exact: true }).click();
//     await fixture.page.locator('div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon').click();
//     await fixture.page.getByText(endDate, { exact: true }).click();
//     await fixture.page.locator('.oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
//     await fixture.page.getByRole('option', { name: 'CAN - FMLA' }).click();
//     await fixture.page.getByRole('button', { name: 'Search' }).click();
// });

// Then('User should see the leave requests for the selected dates', async function () {
//     await expect(fixture.page.getByRole('cell', { name: '' }).locator('i')).toBeVisible();
// });




Given('User searches for specific leave dates', async function () {
    await homePage.searchSpecificLeaveOutline(); //mycide
    const leaveDates = [
        { startDate: '2023-12-28', endDate: '2023-12-29' },
        { startDate: '2023-12-15', endDate: '2023-12-20' }
    ];


    for (const date of leaveDates) {
        await fixture.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList');
        await fixture.page.locator('.oxd-date-input > .oxd-icon').first().click();
        await fixture.page.getByText(date.startDate.split('-')[2], { exact: true }).click();
        await fixture.page.locator('div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon').click();
        await fixture.page.getByText(date.endDate.split('-')[2], { exact: true }).click();
        await fixture.page.locator('.oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
        await fixture.page.getByRole('option', { name: 'CAN - FMLA' }).click();
        await fixture.page.getByRole('button', { name: 'Search' }).click();
        await fixture.page.waitForSelector('.oxd-table');
        const leaveRequests = await fixture.page.locator('.oxd-table').innerText();
        console.log(`Leave requests from ${date.startDate} to ${date.endDate}:`, leaveRequests);
    }
});

When('User performs the search for leave requests', async function () {
    await fixture.page.getByRole('button', { name: 'Search' }).click();
    await fixture.page.waitForSelector('.oxd-table');
});

Then('User should see the leave requests for the specified dates', async function () {
    const leaveRequests = await fixture.page.locator('.oxd-table').innerText();
    console.log('Leave requests:', leaveRequests);
    await expect(fixture.page.locator('.oxd-table')).toBeVisible();
});


Given('User navigates to the My Leave List page', async function () {
    await fixture.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewMyLeaveList');
    await expect(fixture.page.getByRole('heading', { name: 'My Leave List' })).toBeVisible();
    await fixture.page.waitForTimeout(2000);
});

When('User interacts with the leave list container', async function () {
    await fixture.page.locator('.orangehrm-container').click();
});

Then('User should see the leave list container', async function () {
    await expect(fixture.page.locator('.orangehrm-container')).toBeVisible();
    await fixture.page.waitForTimeout(2000);
});



Given('User navigates to the My Leave List page', async function () {
    await fixture.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewMyLeaveList');
    await expect(fixture.page.getByRole('heading', { name: 'My Leave List' })).toBeVisible();
    await fixture.page.waitForTimeout(2000);
});

When('User interacts with the leave list container', async function () {
    await fixture.page.locator('.orangehrm-container').click();
});

Then('User should see the leave list container', async function () {
    await expect(fixture.page.locator('.orangehrm-container')).toBeVisible();
    await fixture.page.waitForTimeout(2000);
});





Given('User navigates to the login page', async function () {
    await fixture.page.goto('https://opensource-demo.orangehrmlive.com/web');
});

When('User clicks on the first link and waits for popup', async function () {
    const page1Promise = fixture.page.waitForEvent('popup');
    await fixture.page.getByRole('link').first().click();
    this.page1 = await page1Promise;
    await this.page1.goto('https://www.linkedin.com/company/orangehrm');
});

When('User clicks on the second link and waits for popup', async function () {
    const page2Promise = fixture.page.waitForEvent('popup');
    await fixture.page.getByRole('link').nth(1).click();
    this.page2 = await page2Promise;
    await this.page2.goto('https://www.facebook.com/OrangeHRM/');
});


When('User clicks on the third link and waits for popup', async function () {
    const page3Promise = fixture.page.waitForEvent('popup');
    await fixture.page.getByRole('link').nth(2).click();
    this.page3 = await page3Promise;
    await this.page3.goto('https://x.com/orangehrm?lang=en&mx=2');
});

When('User clicks on the fourth link and waits for popup', async function () {
    const page4Promise = fixture.page.waitForEvent('popup');
    await fixture.page.getByRole('link').nth(3).click();
    this.page4 = await page4Promise;
    await this.page4.goto('https://www.youtube.com/c/OrangeHRMInc');

});

Then('User should see all popups opened', async function () {
    expect(this.page1).toBeDefined();
    expect(this.page2).toBeDefined();
    expect(this.page3).toBeDefined();
    expect(this.page4).toBeDefined();
});








// Given('User enters the username as {string}', async function (username) {
//     await fixture.page.getByPlaceholder('Username').fill(username);
// });

// Given('User enters the password as {string}', async function (password) {
//     await fixture.page.getByPlaceholder('Password').fill(password);
// });

// Then('Login should be successful', async function () {
//     await fixture.page.getByRole('button', { name: 'Login' }).click();
//     await expect(fixture.page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
// });
