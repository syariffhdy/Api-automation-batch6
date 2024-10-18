const { Ajv } = require("ajv")
const { test, expect } = require("@playwright/test")

test.describe("Reqres.in API Test", () => {
    const ajv = new Ajv();
    var userid;
test('GET Request', async ({request}) => {
    const response = await request.get("https://reqres.in/api/users?page=2");
    const responseJson = await response.json();
    const valid = ajv.validateSchema(require("./json-schema/json-schema1.schema.json"), responseJson);
    if (!valid) {
        console.error("AJV Validation Errors:", ajv.errorsText());
        }
        expect(valid).toBe(true);
        expect(response.status()).toBe(200)
});

test('POST Request', async ({request}) => {
    const reqHeader = {
        Accept: 'application/json'
    }
    const body = {
            "name": "morpheus",
            "job": "leader"
    }
    const response = await request.post("https://reqres.in/api/users/2",{
        headers: reqHeader,
        data: body,
    });
    const responseJson = await response.json();
    const valid = ajv.validateSchema(require("./json-schema/json-schema2.schema.json"), responseJson);
    if (!valid) {
        console.error("AJV Validation Errors:", ajv.errorsText());
        }
        expect(valid).toBe(true);
        expect(response.status()).toBe(201)
        userid = response.id;

});

test('PUT Request', async ({request}) => {
    const reqHeader = {
        Accept: 'application/json'
    }
    const body = {
            "name": "morpheus",
            "job": "zion resident"     
    }
    const response = await request.put("https://reqres.in/api/users/"+userid,{
        headers: reqHeader,
        data: body,
    });
    const responseJson = await response.json();
    const valid = ajv.validateSchema(require("./json-schema/json-schema2.schema.json"), responseJson);
    if (!valid) {
        console.error("AJV Validation Errors:", ajv.errorsText());
        }
        expect(valid).toBe(true);
        expect(response.status()).toBe(200);
    });
    test('DELETE Request', async ({request}) => {
        
        const response = await request.delete("https://reqres.in/api/users/"+userid);
            expect(response.status()).toBe(204)
        });   
 });