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
    await page.waitForTimeout(3000);
    await page.locator(`#button`).click();
    await page.waitForTimeout(3000);



})