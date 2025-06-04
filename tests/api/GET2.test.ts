import { APIActions } from '@lib/APIActions';
import { test, expect, request } from '@playwright/test';

const apiActions = new APIActions();

test('Get All Products List', { tag: '@API'}, async ({ request }) => {
    const response = await request.get('https://rickandmortyapi.com/api/character');

    // Status code check
    await apiActions.verifyStatusCode(response);

    // Verify content-type header
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');

    // Get response body
    const responseBody = await response.json();

    console.log(responseBody);
});


