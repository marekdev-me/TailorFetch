import TailorFetch, { BaseTransform, TailorResponse, IRequestOptions } from "../src/index";
import {assert, expect} from "chai";

describe("transform HTTP response", () => {
   // Test for functional transformer
    it('should transform response with functional transformer', async () => {
        const url = "https://dummyjson.com/products/1";
        const requestOptions = {
            json: true,
            transformResponse: (responseData: any, requestOptions: IRequestOptions): any => {
                return {
                    id: responseData.id
                }
            }
        };

        // Act: Perform the GET request and receive response
        const response: TailorResponse = await TailorFetch.GET(url, requestOptions);

        // Assert: Verify the expected outcomes

        // Check if the response is successful (status code 2xx).
        assert.equal(response.successful(), true, "GET request failed");

        // Check if response is an instance of TailorResponse
        assert.instanceOf(response, TailorResponse);

        expect(response.data).to.have.all.keys('id');

        assert.equal(response.data.id, 1, "Incorrect product id");
    });

   // Test for class based transformer
});