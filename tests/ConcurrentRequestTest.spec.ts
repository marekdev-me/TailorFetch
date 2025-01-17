import {describe} from "node:test";
import TailorFetch, {TailorResponse} from "../src";
import {assert} from "chai";

describe('make concurrent requests', () => {
    it('should make concurrent requests', async () => {

        // Arrange: Set up the test by defining the URL and request options
        const responses: TailorResponse[] = await TailorFetch.concurrent([
            {url: 'https://dummyjson.com/products', method: 'GET', options: {name: 'products', json: true}},
            {url: 'https://dummyjson.com/products/1', method: 'GET', options: {name: 'product', json: true}},
            {url: 'https://dummyjson.com/carts', method: 'GET', options: {name: 'carts', json: true}},
        ]);

        // Check if the response is successful (status code 2xx).
        assert.equal(responses.length, 3, "Failed to make all requests");

        // Check if response is an instance of TailorResponse
        assert.instanceOf(responses, Array);
    });
})