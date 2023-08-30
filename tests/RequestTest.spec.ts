import {describe} from "node:test";
import TailorFetch, {TailorResponse} from "../src/index";
import {assert, expect} from "chai";

describe('make GET, POST, PUT, PATCH, DELETE requests', () => {
   it('should make a GET request and get data back', async () => {

      const response: TailorResponse | undefined = await TailorFetch.GET('https://dummyjson.com/products/1', { parseJSON: true });

      assert.equal(response?.successful(), true);
      assert.instanceOf(response, TailorResponse);
      expect(response?.data).not.be.undefined;
   });

   it('should make a POST request and get new data back', async () => {
      const response = await TailorFetch.POST('https://dummyjson.com/products/add', { parseJSON: true, body: JSON.stringify({
            title: 'example',
            price: 200000
         })});

      assert.equal(response?.data.title, "example", "POST request failed to update data");

      assert.equal(response?.successful(), true);
      assert.instanceOf(response, TailorResponse);
      expect(response?.data).not.be.undefined;
   });

   it('should make a PUT request and get new data back', async () => {
      const response = await TailorFetch.POST('https://dummyjson.com/products/add', { parseJSON: true, body: JSON.stringify({
            title: 'newItem',
            price: 200000
         })});

      assert.equal(response?.data.title, "newItem", "PUT request failed to update data");

      assert.equal(response?.successful(), true);
      assert.instanceOf(response, TailorResponse);
      expect(response?.data).not.be.undefined;
   });

   it('should make a PATCH request and get new data back', async () => {
      const response = await TailorFetch.PATCH('https://dummyjson.com/products/1', { parseJSON: true, body: JSON.stringify({
            title: 'newItem',
            price: 200000
         })});

      assert.equal(response?.data.title, "newItem", "PUT request failed to update data");

      assert.equal(response?.successful(), true);
      assert.instanceOf(response, TailorResponse);
      expect(response?.data).not.be.undefined;
   });

   it('should make a DELETE request and get deleted resource back', async () => {
      const response = await TailorFetch.DELETE('https://dummyjson.com/products/1', { parseJSON: true });

      assert.equal(response?.data.id, 1, "PUT request failed to update data");

      assert.equal(response?.successful(), true);
      assert.instanceOf(response, TailorResponse);
      expect(response?.data).not.be.undefined;
   });
});