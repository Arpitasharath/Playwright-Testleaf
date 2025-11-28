import { test, chromium } from "@playwright/test"
import { channel } from "diagnostics_channel";

test(`CSS selctor`, async () => {

    const browser = await chromium.launch({ channel: "chrome", headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("http://leaftaps.com/opentaps/control/login");
    await page.locator(`#username`).fill(`Demosalesmanager`);
    await page.locator(`#password`).fill(`crmsfa`);
    await page.locator(`.decorativeSubmit`).click();

    await page.locator(`#button`).click();
    await page.click('text=Leads');
    await page.click(`text=Create Lead`);
    await page.waitForTimeout(30000);
    await page.locator(`#createLeadForm_companyName`).fill(`ZCP`);
    await page.locator(`#createLeadForm_firstName`).fill(`Arpita`);
    await page.locator(`#createLeadForm_lastName`).fill(`S`);
    await page.locator(`#createLeadForm_personalTitle`).fill(`Hello`);
    await page.locator(`#createLeadForm_personalTitle`).fill(`Playwright`);
    await page.locator(`#createLeadForm_annualRevenue`).fill(`10lpa`);
    await page.locator(`#createLeadForm_departmentName`).fill(`QA`);
    await page.locator(`#createLeadForm_primaryPhoneNumber`).fill(`9383728223`);
    const title = await page.title();
    console.log("Page Title is:", title);


    await page.locator(`.smallSubmit`).click();



})