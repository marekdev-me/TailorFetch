import { describe } from "node:test";
import TailorFetch, { TailorResponse } from "../src/index";
import { assert, expect } from "chai";

describe('make GET, POST, PUT, PATCH, DELETE requests', () => {
   it('should successfully retrieve data from a GET request', async () => {
      // Arrange: Set up the test by defining the URL and request options
      const url = "https://dummyjson.com/products/1";
      const requestOptions = { json: true };

      // Act: Perform the GET request and receive response
      const response: TailorResponse = await TailorFetch.GET(url, requestOptions);

      // Assert: Verify the expected outcomes

      // Check if the response is successful (status code 2xx).
      assert.equal(response.successful(), true, "GET request failed");

      // Check if response is an instance of TailorResponse
      assert.instanceOf(response, TailorResponse);

      // Check that data is received and is not undefined
      expect(response.data).to.not.be.undefined;
   });

   it('should successfully create a new product via POST request', async () => {
      // Arrange: Set up the test by defining the URL and request options
      const url = "https://dummyjson.com/products/add";
      const requestOptions = {
         json: true,
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            "title": 'example',
         })
      };

      // Act: Perform the GET request and receive response
      const response: TailorResponse = await TailorFetch.POST(url, requestOptions);

      // Assert: Verify the expected outcomes

      // Check if the response is successful (status code 2xx)
      assert.equal(response.successful(), true, "POST request failed");

      // Check if response is an instance of TailorResponse
      assert.instanceOf(response, TailorResponse);

      // Check that data is received and is not undefined
      expect(response.data).to.not.be.undefined;

      // Check specific response data properties
      assert.equal(response.data.title, 'example', 'Incorrect product title');
   });

   it('should successfully update data via PUT request', async () => {
      // Arrange: Set up the test by defining the URL and request options
      const url = "https://dummyjson.com/products/1";
      const requestOptions = {
         json: true,
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            "title": 'updatedItem',
         })
      };

      // Act: Perform the GET request and receive response
      const response: TailorResponse = await TailorFetch.PUT(url, requestOptions);

      // Assert: Verify the expected outcomes

      // Check if the response is successful (status code 2xx)
      assert.equal(response.successful(), true, 'PUT request has failed');

      // Check if response is an instance of TailorResponse
      assert.instanceOf(response, TailorResponse);

      // Check that data is received and is not undefined
      expect(response.data).to.not.be.undefined;

      // Check specific response data properties
      assert.equal(response.data.title, 'updatedItem', 'Incorrect product title');
   });

   it('should successfully update data via PATCH request', async () => {
      // Arrange: Set up the test by defining the URL and request options
      const url = "https://dummyjson.com/products/1";
      const requestOptions = {
         json: true,
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            "title": 'updatedItem',
         })
      };

      // Act: Perform the GET request and receive response
      const response: TailorResponse = await TailorFetch.PATCH(url, requestOptions);

      // Assert: Verify the expected outcomes

      // Check if the response is successful (status code 2xx)
      assert.equal(response.successful(), true, 'PUT request has failed');

      // Check if response if an instance of TailorResponse
      assert.instanceOf(response, TailorResponse);

      // Check that data is received and is not undefined
      expect(response.data).to.not.be.undefined;

      // Check specific response data properties
      assert.equal(response.data.title, 'updatedItem', 'Incorrect product title');
   });

   it('should successfully delete a resource via DELETE request', async () => {
      // Arrange: Set up the test by defining the URL and request options.
      const url = 'https://dummyjson.com/products/1'; // Use the appropriate URL for deleting the resource.
      const requestOptions = {
         json: true,
      };

      // Act: Perform the DELETE request and receive a response.
      const response: TailorResponse = await TailorFetch.DELETE(url, requestOptions);

      // Assert: Verify the expected outcomes.

      // Check if the response is successful (status code 2xx).
      assert.equal(response.successful(), true, 'DELETE request failed');

      // Check if the response is an instance of TailorResponse.
      assert.instanceOf(response, TailorResponse);

      // Check that data is received and is not undefined.
      expect(response.data).to.not.be.undefined;

      // Check specific response data properties, e.g., the ID of the deleted resource.
      assert.equal(response.data.id, 1, 'Incorrect resource ID');
   });

   it('should successfully make a HEAD request', async () => {
      // Arrange: Set up the test by defining the URL and request options.
      const url = 'https://dummyjson.com/products/1'; // Use the appropriate URL for the HEAD request.

      // Act: Perform the HEAD request and receive a response.
      const response: TailorResponse = await TailorFetch.HEAD(url);

      // Assert: Verify the expected outcomes.

      // Check if the response is successful (status code 2xx).
      assert.equal(response.successful(), true, 'HEAD request failed');

      // Check if the response is an instance of TailorResponse.
      assert.instanceOf(response, TailorResponse);

      // Check that data is received and is undefined for a HEAD request.
      expect(response.data).to.be.undefined;
   });

   it('should successfully make an OPTIONS request', async () => {
      // Arrange: Set up the test by defining the URL and request options.
      const url = 'https://dummyjson.com/products/1'; // Use the appropriate URL for the OPTIONS request.

      // Act: Perform the OPTIONS request and receive a response.
      const response: TailorResponse = await TailorFetch.OPTIONS(url);

      // Assert: Verify the expected outcomes.

      // Check if the response is successful (status code 2xx).
      assert.equal(response.successful(), true, 'OPTIONS request failed');

      // Check if the response is an instance of TailorResponse.
      assert.instanceOf(response, TailorResponse);

      // Check that data is received and is not undefined.
      expect(response.data).to.be.undefined;

      // Check if the "Allow" header is present in the response headers.
      const allowHeader = response.headers?.get('access-control-allow-methods');
      expect(allowHeader).to.not.be.null;
   });
});