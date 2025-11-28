import { test, chromium } from "@playwright/test"
import { channel } from "diagnostics_channel";

test(`assignment2 selctor`, async () => {

    const browser = await chromium.launch({ channel: "chrome", headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("http://leaftaps.com/opentaps/control/login");
    await page.locator(`#username`).fill(`Demosalesmanager`);
    await page.locator(`#password`).fill(`crmsfa`);
    await page.locator(`.decorativeSubmit`).click();

    await page.locator(`#button`).click();
    await page.click('text=Leads');
    await page.waitForTimeout(30000);
    await page.click('text=Find Leads');

    await page.locator(`#ext-gen248`).fill(`Arpita`);
    await page.locator(`#ext-gen334`).click();
    await page.waitForTimeout(3000);
    await page.click('text=10335');
    await page.waitForTimeout(3000);
    await page.click('text=Edit');
    //await page.locator(`#ext-gen597`).click();
    await page.waitForTimeout(30000);
    await page.locator(`#ext-gen600`).click();
    await page.waitForTimeout(30000);
    await page.locator(`#updateLeadForm_companyName`).fill("ZCP Updated");
    await page.locator("#updateLeadForm_annualRevenue").fill("25LPA");
    await page.locator("#updateLeadForm_departmentName").fill("QA Testing");
    await page.locator("#updateLeadForm_description").fill("Updated via Playwright automation script");

    await page.click(".smallSubmit");


    const title = await page.title();
    console.log("Page Title After Update:", title);



})