import { expect, Page } from "@playwright/test";
import { fixture } from "../hooks/pageFixture";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

export default class HomePage {
    navigateToHomePage() {
        throw new Error("Method not implemented.");
    }

    async validateTableData() {
        const tableData = [];
    }
    // constructor(page: Page) {
    //          this.base = new PlaywrightWrapper(page);
    //        }
    
    async goToHomePage() {
        await fixture.page.locator("//button").click();
    }

    async forgotPassword() {
        await fixture.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
        await fixture.page.getByRole('heading', { name: 'Reset Password' }).isVisible();
    }

    async searchSpecificLeaveOutline() {
        const leaveDates = [
            { startDate: '28', endDate: '29' },
            { startDate: '21', endDate: '24' }
        ];

        await leaveDates.map(async (date) => {
            await fixture.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList');
            await fixture.page.getByRole('button', { name: 'Login' }).click();
            await fixture.page.getByRole('link', { name: 'Leave' }).click();
            
            await fixture.page.fill('input[name="startDate"]', date.startDate);
            await fixture.page.fill('input[name="endDate"]', date.endDate);
            await fixture.page.locator('.oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
            await fixture.page.getByRole('option', { name: 'CAN - FMLA' }).click();
            await fixture.page.getByRole('cell', { name: '' }).locator('i').click();
            await fixture.page.getByRole('row', { name: ' 2025-28-01 to 2025-29-01' }).click();
            await fixture.page.click('button[type="submit"]');
            await fixture.page.waitForSelector('.oxd-table');
            const leaveRequests = await fixture.page.locator('.oxd-table').innerText();
            console.log(`Leave requests from ${date.startDate} to ${date.endDate}:`, leaveRequests);
        });
    }
}

// async applyLeave(){
//     await fixture.page.getByRole('link', { name: 'Leave' }).click();
//     await fixture.page.locator('li').filter({ hasText: 'My Leave' }).click();
//     await fixture.page.locator('li').filter({ hasText: 'Apply' }).click();
//     await fixture.page.getByText('John Doe').click();
// }}

//     async readTableData() {
//         //https://www.w3schools.com/html/html_tables.asp
//         //https://afd.calpoly.edu/web/sample-tables
//         const tableData = [];
//         const rows = await fixture.page.locator(`.table_directory tbody tr`).all();

//         for (const row of rows) {
//             const cells = await row.locator('td').all();
//             const rowData = [];
//             for (const cell of cells) {
//                 // async forgotPassword() {
//                 //     await fixture.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
//                 //     await fixture.page.getByRole('heading', { name: 'Reset Password' }).isVisible();
//                 // }
//                 rowData.push(await cell.innerText());
//             }
//             if (rowData.length > 0) {
//                 tableData.push(rowData);
//             }
//         }
//         return tableData;
//     }
// }
// await page.getByLabel('Sidepanel').locator('div').filter({ hasText: 'AdminPIMLeaveTimeRecruitmentMy' }).click();
// async navigateToSection(sectionName: string) {
//     await fixture.page.getByLabel('Sidepanel').locator('div').filter({ hasText: sectionName }).click();
// export  class homepage{
//     async navigateToHomePage() {
//     await fixture.page.goto("https://www.w3schools.com/html/html_tables.asp");
//     await fixture.page.waitForTimeout(3000);
//   }
//   async validateTableData(){

//     const tableData= [];
//     const rows=await fixture.page.locator('#customers tbody tr').all();

//     for (const row of rows){
//         const cells =await row.locator('td').all();
//         const rowData=[];
//         for(const cell of cells){
//            rowData.push(await cell.innerText()); 
//         }
//         if (rowData.length>0){
//             tableData.push(rowData);
//         }
//     }
// }
// }



//usernamepassword


