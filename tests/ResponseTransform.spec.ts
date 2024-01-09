import TailorFetch, { BaseTransform, TailorResponse, IRequestOptions } from "../src/index";
import {assert, expect} from "chai";

const makeRequest = async (url: string, reqOptions: IRequestOptions): Promise<TailorResponse> => {
    return await TailorFetch.GET(url, reqOptions);
}

class ProductTransformer implements BaseTransform {
    transform(responseData: any, requestOptions: IRequestOptions): any {
        return {
            id: responseData.id
        }
    }
}

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
        const response = await makeRequest(url, requestOptions);

        // Assert: Verify the expected outcomes

        // Check if the response is successful (status code 2xx).
        assert.equal(response.successful(), true, "GET request failed");

        // Check if response is an instance of TailorResponse
        assert.instanceOf(response, TailorResponse);

        expect(response.data).to.have.all.keys('id');

        assert.equal(response.data.id, 1, "Incorrect product id");
    });

    // Test for functional transformer
    it('should transform response with class transformer', async () => {
        const url = "https://dummyjson.com/products/1";
        const requestOptions: IRequestOptions = {
            json: true,
            transformResponse: new ProductTransformer
        };

        // Act: Perform the GET request and receive response
        const response = await makeRequest(url, requestOptions);

        // Assert: Verify the expected outcomes

        // Check if the response is successful (status code 2xx).
        assert.equal(response.successful(), true, "GET request failed");

        // Check if response is an instance of TailorResponse
        assert.instanceOf(response, TailorResponse);

        expect(response.data).to.have.all.keys('id');

        assert.equal(response.data.id, 1, "Incorrect product id");
    });
});