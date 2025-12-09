import { expect, test } from "@playwright/test";

test.use({
    storageState: "Data/salesforceLogin.json",
});

test("Marathon to create lead to new opportunity", async ({ page }) => {

    // Step 1: Navigate to Salesforce App
    await page.goto(`https://orgfarm-741540c4b0-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome`);
    await page.waitForSelector('button[title="App Launcher"]');
    await page.waitForTimeout(30000);
    // Step 2: Open App Launcher
    await page.locator('button[title="App Launcher"]').click();
    await page.waitForTimeout(3000);
    await page.getByText("View All").click();

    await page.waitForTimeout(3000);

    // Wait for the real App Launcher search box
    const appSearch = page.getByPlaceholder("Search apps or items...");
    await appSearch.waitFor({ state: "visible" });
    await appSearch.click();

    await appSearch.fill("Marketing");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(3000);
    const marketingTile = page.getByRole('link', { name: /Marketing CRM Classic/ });

    await marketingTile.waitFor({ state: "visible" });
    await marketingTile.click();

    await page.waitForTimeout(30000);
    // Step 4: Go to Leads Tab
    const leadsTab = page.locator(`(//div[@class='slds-context-bar__label-action slds-p-left_none'])[2]`);
    await leadsTab.click();
    await page.waitForTimeout(3000);
    await page.getByRole('menuitem', { name: 'New Lead' }).click();

    await page.waitForSelector('text=Salutation');

    await page.getByRole("combobox", { name: "Salutation" }).click();
    await page.getByRole("option", { name: "Ms." }).click();

    await page.getByPlaceholder(`First Name`).fill("Arpita");
    await page.getByPlaceholder(`Last Name`).fill("S");
    await page.getByLabel(`Company`).fill("BMH");

    await page.locator(`button.slds-button.slds-button_brand`).click();

    // Step 6: Validate toast message
    // Allow small wait for Salesforce toast animation after save
    await page.waitForTimeout(1500);
    // Wait for toast to appear
    const toastMessage = page.locator('.toastMessage');
    await toastMessage.waitFor({ state: 'visible' });

    // Assert pattern (name dynamic)
    await expect(toastMessage).toHaveText(/Lead ".*" was created\./);

    // Log exact message
    const text = await toastMessage.textContent();
    console.log("Toast Message:", text);

    await page.waitForTimeout(3000);



    // Step 8: Click dropdown near Submit for Approval
    await page.getByRole('button', { name: 'Show more actions' }).click();

    // Wait for menu to appear
    await page.waitForSelector('span:has-text("Convert")');

    // Now click Convert
    await page.getByRole('menuitem', { name: 'Convert' }).click();
    await page.waitForTimeout(3000);


    await page.locator(`//button[@title="BMH-"]`).click();
    await page.waitForTimeout(3000);

    const opportunityNameInput = page.getByLabel(`Opportunity Name`);

    // Wait until it's ready
    await opportunityNameInput.waitFor({ state: 'visible' });

    // Clear and fill the updated value
    await opportunityNameInput.fill('Teastleaf');


    // ----- Step 12: Click Convert -----
    await page.getByRole("button", { name: "Convert" }).click();

    // Step 13: Verify conversion was successful
    const conversionHeader = page.getByRole("heading", { name: "Your lead has been converted" });
    await expect(conversionHeader).toBeVisible();

    // Print the heading text
    const conversionText = await conversionHeader.textContent();
    console.log("Conversion Heading:", conversionText?.trim());

    // Step 14: Click Go to Leads
    await page.getByRole("button", { name: "Go to Leads" }).click();
    await page.waitForTimeout(3000);



    // Navigate to Opportunities tab
    await page.getByRole("link", { name: "Opportunities" }).click();

    // Wait until the Opportunities table search input is ready
    const oppSearch = page.getByRole("searchbox", { name: "Search this list..." });
    await expect(oppSearch).toBeVisible(); // Playwright auto-waits

    // Perform the search
    await oppSearch.fill("Testleaf");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(3000);
    // Assert result
    await expect(page.getByText("Teastleaf")).toBeVisible();




});
