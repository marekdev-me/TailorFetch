import TailorFetch, {IRequestOptions, TailorResponse, BaseRequestInterceptor} from "../src";
import {assert, expect} from "chai";


const makeRequest = async (url: string, reqOptions: IRequestOptions): Promise<TailorResponse> => {
    return await TailorFetch.GET(url, reqOptions);
}

class RequestInterceptor implements BaseRequestInterceptor {
    intercept(requestOptions: RequestInit): RequestInit {
        const headers = new Headers(requestOptions.headers);

        headers.set("just", "set");

        requestOptions.headers = headers;

        return requestOptions;
    }
}

describe("request interceptor test", () => {
    it("should update request using functional interceptor", async () => {
        const url = "http://localhost:3000/headers";
        const requestOptions: IRequestOptions = {
            json: true,
            requestInterceptor: (requestOptions: RequestInit): RequestInit => {

                const headers = new Headers(requestOptions.headers);

                headers.set(
                    "just", "set"
                );

                requestOptions.headers = headers;

                return requestOptions;
            }
        };

        // Act: Perform the GET request and receive response
        const response = await makeRequest(url, requestOptions);

        // Assert: Verify the expected outcomes

        // Check if the response is successful (status code 2xx).
        assert.equal(response.successful(), true, "GET request failed");

        // Check if response is an instance of TailorResponse
        assert.instanceOf(response, TailorResponse);

        // console.log(response.data.hasOwnProperty('just'));

        expect(Object.keys(response.data)).to.include.members(['just']);
    });

    // Class Based
    it("should update request using class based interceptor", async () => {
        const url = "http://localhost:3000/headers";
        const requestOptions: IRequestOptions = {
            json: true,
            requestInterceptor: new RequestInterceptor
        };

        // Act: Perform the GET request and receive response
        const response = await makeRequest(url, requestOptions);

        // Assert: Verify the expected outcomes

        // Check if the response is successful (status code 2xx).
        assert.equal(response.successful(), true, "GET request failed");

        // Check if response is an instance of TailorResponse
        assert.instanceOf(response, TailorResponse);

        expect(Object.keys(response.data)).to.include.members(['just']);
    });
});