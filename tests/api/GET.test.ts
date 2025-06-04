import { APIActions } from '@lib/APIActions';
import { test, expect, request } from '@playwright/test';

const apiActions = new APIActions();

test('Get All Products List', { tag: '@API'}, async ({ request }) => {
   const response = await request.get('/api/productsList');

   // Status code check
   await apiActions.verifyStatusCode(response);

   // Verify content-type header
   const contentType = response.headers()['content-type'];
   expect(contentType).toContain('application/json');

   // Get response body
   const responseBody = await response.json();

   // Verify response body structure and data types
   expect(responseBody).toHaveProperty('products');
   expect(Array.isArray(responseBody.products)).toBeTruthy();

   // Validate each product in the list
   for (const product of responseBody.products) {
       expect(product).toHaveProperty('id');
       expect(typeof product.id).toBe('number');

       expect(product).toHaveProperty('name');
       expect(typeof product.name).toBe('string');

       expect(product).toHaveProperty('price');
       expect(typeof product.price).toBe('string');
       expect(product.price).toMatch(/^Rs\. \d+$/); // Matches "Rs. <number>"

       expect(product).toHaveProperty('brand');
       expect(typeof product.brand).toBe('string');

       expect(product).toHaveProperty('category');
       expect(typeof product.category).toBe('object');

       expect(product.category).toHaveProperty('usertype');
       expect(typeof product.category.usertype).toBe('object');
       expect(product.category.usertype).toHaveProperty('usertype');
       expect(typeof product.category.usertype.usertype).toBe('string');
       expect(['Women', 'Men', 'Kids']).toContain(product.category.usertype.usertype);

       expect(product.category).toHaveProperty('category');
       expect(typeof product.category.category).toBe('string');
   }
});

test('Get All Brands List', { tag: '@API'}, async ({ request }) => {
    const response = await request.get('/api/brandsList');

    // Status code check
    await apiActions.verifyStatusCode(response);

    // Verify content type header
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');

    // Get response body
    const responseBody = await response.json();

    // Verify response body structure and data types
    expect(responseBody).toHaveProperty('brands');
    expect(Array.isArray(responseBody.brands)).toBeTruthy();

    // Validate each brand in the list
    for (let brand of responseBody.brands) {
        expect(brand).toHaveProperty('id');
        expect(typeof brand.id).toBe('number');

        expect(brand).toHaveProperty('brand');
        expect(typeof brand.brand).toBe('string');
    }
});

test('Get User Detail By Email', { tag: '@API'}, async ({ request }) => {
    const userEmail = 'someuser@example.com'; // Use a relevant email for testing
    const response = await request.get('/api/getUserDetailByEmail', {
        params: {
            email: userEmail
        }
    });

    // Status code check
    await apiActions.verifyStatusCode(response);

    // Verify content-type header
    const contentType = response.headers()['content-type'];
    expect(contentType, 'Content-Type header should indicate JSON').toContain('application/json');

    // Get response body
    const responseBody = await response.json();

    // Verify response body structure and data types
    expect(responseBody, 'Response body should have a responseCode property').toHaveProperty('responseCode');
    expect(responseBody.responseCode, 'responseCode in body should be 200').toBe(200);

    expect(responseBody, 'Response body should have a user property').toHaveProperty('user');
    const user = responseBody.user;

    expect(user, 'User object should have an id property').toHaveProperty('id');
    expect(typeof user.id, 'User id should be a number').toBe('number');

    expect(user, 'User object should have a name property').toHaveProperty('name');
    expect(typeof user.name, 'User name should be a string').toBe('string');

    expect(user, 'User object should have an email property').toHaveProperty('email');
    expect(typeof user.email, 'User email should be a string').toBe('string');
    expect(user.email, 'User email in response should match requested email').toBe(userEmail);

    // Additional fields from the provided example response
    expect(user).toHaveProperty('title');
    expect(typeof user.title).toBe('string');

    expect(user).toHaveProperty('birth_day');
    expect(typeof user.birth_day).toBe('string');

    expect(user).toHaveProperty('birth_month');
    expect(typeof user.birth_month).toBe('string');

    expect(user).toHaveProperty('birth_year');
    expect(typeof user.birth_year).toBe('string');

    expect(user).toHaveProperty('first_name');
    expect(typeof user.first_name).toBe('string');

    expect(user).toHaveProperty('last_name');
    expect(typeof user.last_name).toBe('string');

    expect(user).toHaveProperty('company');
    expect(typeof user.company).toBe('string');

    expect(user).toHaveProperty('address1');
    expect(typeof user.address1).toBe('string');

    expect(user).toHaveProperty('address2');
    expect(typeof user.address2).toBe('string');

    expect(user).toHaveProperty('country');
    expect(typeof user.country).toBe('string');

    expect(user).toHaveProperty('state');
    expect(typeof user.state).toBe('string');

    expect(user).toHaveProperty('city');
    expect(typeof user.city).toBe('string');

    expect(user).toHaveProperty('zipcode');
    expect(typeof user.zipcode).toBe('string');
});

// test(`getUsers`, { tag: '@API'}, async ({ request }) => {
//     const response = await request.get(`/api/users?per_page=1`);
//     await apiActions.verifyStatusCode(response);
//
//     //* Body Response Params and Body Response Headers are stored in single text file separated by #
//     const responseBodyParams = (await apiActions.readValuesFromTextFile(`getUsers`)).split(`#`)[0];
//     await apiActions.verifyResponseBody(responseBodyParams, await response.json(), `Response Body`);
//
//     const responseBodyHeaders = (await apiActions.readValuesFromTextFile(`getUsers`)).split(`#`)[1];
//     await apiActions.verifyResponseHeader(responseBodyHeaders, response.headersArray(), `Response Headers`);
// });

//* In Case you application has token system, Please use the below code

// test(`@API getUsersToken`, async ({ playwright, baseURL }) => {
//     const apiContext = await playwright.request.newContext({
//         baseURL: baseURL,
//         extraHTTPHeaders: {
//             'Authorization': `Your App Token`
//         }
//     });
//     const response = await apiContext.get(`/api/users?per_page=1`);
//     await apiActions.verifyStatusCode(response.status(), 200);

//     //* Body Response Params and Body Response Headers are stored in single text file separated by #
//     const responseBodyParams = (await apiActions.readValuesFromTextFile(`getUsers`)).split(`#`)[0];
//     await apiActions.verifyResponseBody(responseBodyParams, await response.json(), `Response Body`);

//     const responseBodyHeaders = (await apiActions.readValuesFromTextFile(`getUsers`)).split(`#`)[1];
//     await apiActions.verifyResponseHeader(responseBodyHeaders, response.headersArray(), `Response Headers`);
// });



