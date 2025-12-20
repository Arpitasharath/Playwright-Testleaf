import { expect, test } from "@playwright/test";
import { log } from "console";
import { create } from "domain";
import { request } from "http";
let id: any;
test.describe.serial(`Service Now`, async () => {
    test(`Learn to create data from Service Now using API-POST method`, async ({ request }) => {


        const response = await request.post(`https://dev291487.service-now.com/api/now/table/incident`,
            {

                headers:
                {
                    "Authorization": "Basic YWRtaW46QjdoL1E3T3dqYy9C",
                    "Content-Type": "application/json"
                },
                data:
                {

                    "short_description": "Email not working(Arpita)",
                    "description": "User cannot send or receive emails",
                    "comments": "Updated via REST API",
                    "work_notes": "Checked mail server logs",
                    "subcategory": "Email",
                    "impact": "2",
                    "urgency": "2"
                }
            })
        //Conver response to joson format and print it
        const resonseBody = await response.json();
        console.log(resonseBody);

        //Get the Status Code
        console.log(response.status());
        console.log(response.statusText());

        //Validate the status code using expect
        expect(response.status()).toBe(201);
        expect(response.statusText()).toBe("Created");

        //Get the sys_id from responseBody
        id = resonseBody.result.sys_id;
        console.log(await resonseBody.result.sys_id);
    })

    test(`Learn to fetch date from Service Now using API-GET method`, async ({ request }) => {

        const response = await request.get(`https://dev291487.service-now.com/api/now/table/incident/${id}`,
            {

                headers:
                {
                    "Authorization": "Basic YWRtaW46QjdoL1E3T3dqYy9C",
                    "Content-Type": "application/json"
                },

            })

        //Get the Status Code
        console.log(response.status());
        console.log(response.statusText());

        //Validate the status code using expect
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe("OK");

    })
    test(`Learn to udpate data from Service Now using API-PUT method`, async ({ request }) => {


        const response = await request.put(`https://dev291487.service-now.com/api/now/table/incident/${id}`,
            {

                headers:
                {
                    "Authorization": "Basic YWRtaW46QjdoL1E3T3dqYy9C",
                    "Content-Type": "application/json"
                },
                data:
                {

                    "short_description": "Email working(Arpita)",
                    "description": "User cannot send or receive emails",
                    "comments": "Updated via Playwright",
                    "work_notes": "Checked mail server logs",
                    "subcategory": "Email",
                    "impact": "2",
                    "urgency": "2"
                }
            })
        //Conver response to joson format and print it
        const resonseBody = await response.json();
        console.log(resonseBody);

        //Get the Status Code
        console.log(response.status());
        console.log(response.statusText());

        //Validate the status code using expect
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe("OK");

        //Get the sys_id from responseBody
        id = resonseBody.result.sys_id;
        console.log(await resonseBody.result.sys_id);
    })

    test(`Learn to delete date from Service Now using API-GET method`, async ({ request }) => {

        const response = await request.delete(`https://dev291487.service-now.com/api/now/table/incident/${id}`,
            {

                headers:
                {
                    "Authorization": "Basic YWRtaW46QjdoL1E3T3dqYy9C",
                    "Content-Type": "application/json"
                },

            })

        //Get the Status Code
        console.log(response.status());
        console.log(response.statusText());

        //Validate the status code using expect
        expect(response.status()).toBe(204);
        expect(response.statusText()).toBe("No Content");

    })
})








