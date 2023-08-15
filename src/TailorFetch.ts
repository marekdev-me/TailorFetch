import IRequestOptions from "./IRequestOptions";
import http, {
    IncomingMessage,
    RequestOptions as HttpRequestOptions
} from 'http';
import https from 'https';

export default class TailorFetch {

    private static async makeRequest(urlStr: string, method: string,  options: IRequestOptions): Promise<unknown> {
        const { headers, queryParams, timeout, parseJSON, transformResponse, data } = options;

        // Parse URL
        const url= new URL(urlStr);

        // Handle query parameters
        if (queryParams) {
            for (const key in queryParams) {
                url.searchParams.append(key, queryParams[key]);
            }
        }

        // Handle request data
        const requestBody = data ? JSON.stringify(data) : undefined;

        // Handle request headers
        const requestOptions: HttpRequestOptions = {
            method,
            headers: {
                ...(headers || {}),
                'Content-Type': requestBody ? 'application/json' : 'application/octet-stream',
                'Content-Length': requestBody ? Buffer.byteLength(requestBody) : 0,
            },
            timeout
        }

        const httpModule = url.protocol === 'https:' ? https : http;

        return new Promise((resolve, reject) => {
            const req = httpModule.request(url.toString(), requestOptions, (res: IncomingMessage) => {
                let responseData = "";

                res.on('data', (chunk: string) => {
                   responseData += chunk;
                });

                res.on('end', () => {
                   if (parseJSON) {
                       try {
                           const jsonData = JSON.parse(responseData);

                           if (transformResponse) {
                               const transformedResponse = transformResponse.transform(jsonData);
                               resolve(transformedResponse);
                           }

                           resolve(jsonData);
                       } catch (error) {
                           reject(error);
                       }
                   }

                   if (transformResponse) {
                       const transformedResponse = transformResponse.transform(responseData);
                       resolve(transformedResponse);
                   }

                   if (!parseJSON || !transformResponse) {
                       resolve(responseData);
                   }
                });
            });

            req.on('error', (error) => {
               reject(error);
            });

            if (requestBody) {
                req.write(requestBody);
            }

            if (timeout) {
                req.setTimeout(timeout, () => {
                   req.destroy();
                   reject(new Error('Request timed out'));
                });
            }

            req.end();
        });
    }

    /**
     * Make an HTTP GET request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Request options to add to request
     */
    static async GET(urlStr: string, options: IRequestOptions): Promise<any> {
        return {
            data: await this.makeRequest(urlStr, 'GET', { ...options }),
            config: options
        }
    }


    /**
     * Make an HTTP POST request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Request options to add to request
     */
    static async POST(urlStr: string, options: IRequestOptions): Promise<any> {
        return {
            data: await this.makeRequest(urlStr, 'POST', { ...options }),
            config: options
        }
    }

    /**
     * Make an HTTP PUT request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Request options to add to request
     */
    static async PUT(urlStr: string, options: IRequestOptions): Promise<any> {
        return this.makeRequest(urlStr, 'PUT', { ...options });
    }

    /**
     * Make an HTTP PATCH request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Options to make request to
     * @constructor
     */
    static async PATCH(urlStr: string, options: IRequestOptions): Promise<any> {
        return this.makeRequest(urlStr, 'PATCH', { ...options });
    }

    /**
     * Make an HTTP DELETE request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Options to add to request
     */
    static async DELETE(urlStr: string, options: IRequestOptions): Promise<any> {
        return this.makeRequest(urlStr, 'DELETE', { ...options });
    }

    static async OPTIONS(): Promise<any> {

    }
}