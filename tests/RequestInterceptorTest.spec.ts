import TailorFetch, {IRequestOptions, TailorResponse, BaseRequestInterceptor} from "../src";
import {assert} from "chai";

const makeRequest = async (url: string, reqOptions: IRequestOptions): Promise<TailorResponse> => {
    return await TailorFetch.GET(url, reqOptions);
}

class RequestInterceptor implements BaseRequestInterceptor {
    intercept(requestOptions: RequestInit): RequestInit {
        const headers = new Headers(requestOptions.headers);

        headers.set('Content-Type','application/json');
        requestOptions.headers = headers;

        if (typeof requestOptions.body === "string") {
            const bodyData = JSON.parse(requestOptions.body);

            bodyData.title = "intercepted name";

            requestOptions.body = JSON.stringify(bodyData);
        }

        return requestOptions;
    }
}

describe("request interceptor test", () => {
    it("should update request using functional interceptor", async () => {
        const url = "https://dummyjson.com/products/add";
        const requestOptions: IRequestOptions = {
            json: true,
            body: JSON.stringify({
                title: 'example product',
                price: 300.00
            }),
            requestInterceptor: (requestOptions: RequestInit): RequestInit => {
                const headers = new Headers(requestOptions.headers);

                headers.set('Content-Type','application/json');
                requestOptions.headers = headers;

                if (typeof requestOptions.body === "string") {
                    const bodyData = JSON.parse(requestOptions.body);

                    bodyData.title = "intercepted name";

                    requestOptions.body = JSON.stringify(bodyData);
                }

                return requestOptions;
            }
        };

        const response = await TailorFetch.POST(url, requestOptions);

        assert.equal(response.successful(), true, "Functional interceptor POST failed");

        assert.equal(response.data.title, "intercepted name", "Functional interceptor data change failed");
    });

    // Class Based
    it("should update request using class based interceptor", async () => {
        const url = "https://dummyjson.com/products/add";
        const requestOptions: IRequestOptions = {
            json: true,
            body: JSON.stringify({
                title: 'example product',
                price: 300.00
            }),
            requestInterceptor: new RequestInterceptor
        };

        const response = await TailorFetch.POST(url, requestOptions);

        assert.equal(response.successful(), true, "Class interceptor POST failed");

        assert.equal(response.data.title, "intercepted name", "Class interceptor data change failed");
    });
});