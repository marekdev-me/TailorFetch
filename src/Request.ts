import * as Http from "http";
import IRequestOptions from "./IRequestOptions";
import cache from "./Cache";

export default class Request {

    /**
     * Url of the remote server to make request to
     *
     * @private
     */
    private readonly urlStr: URL;

    /**
     * HTTP method to use for request
     *
     * @private
     */
    private readonly method: string;

    /**
     * Request options to add to request
     *
     * @private
     */
    private requestOptions: IRequestOptions;

    /**
     * Signal to be used for cancellation
     *
     * @private
     */
    private readonly abortSignal: AbortSignal | undefined;

    /**
     * Request response
     *
     * @private
     */
    private response: Response | undefined = undefined;

    constructor(urlStr: string, method: string, requestOptions: IRequestOptions, signal?: AbortSignal) {
        this.urlStr = new URL(urlStr);
        this.method = method;
        this.requestOptions = requestOptions;
        this.abortSignal = signal;
    }

    /**
     * Make an HTTP request to a remote URL
     */
    async make(): Promise<Http.IncomingMessage | string> {

        const requestOptionsObject: RequestInit = {
            method: this.method,
            headers: this.setHeaders(),
            mode: this.requestOptions.requestMode,
            body: this.requestOptions.body,
            cache: this.requestOptions.requestCache,
            credentials: this.requestOptions.requestCredentials,
            signal: this.abortSignal
        }

        // Generate the cache key
        const cacheKey = this.generateCacheKey(this.method, this.urlStr.toString(), this.requestOptions);

        if (this.method === 'GET') {
            const cacheResponse = cache.get(cacheKey);
            if (cacheResponse) {
                return cacheResponse;
            }
        }

        // Make an HTTP request
        const response = await fetch(this.urlStr, requestOptionsObject);

        // Store response
        this.response = response;

        if (this.requestOptions.transformResponse) {
            if (this.requestOptions.parseJSON) {
                const transformedResponse = this.requestOptions.transformResponse.transform(JSON.parse(await response.text()));
                if (this.requestOptions.cache) {
                    cache.set(cacheKey, transformedResponse, this.requestOptions.cache.expiresIn);
                }
                return transformedResponse;
            }

            const transformedResponse = this.requestOptions.transformResponse.transform(await response.text());

            if (this.requestOptions.cache) {
                cache.set(cacheKey, transformedResponse, this.requestOptions.cache.expiresIn);
            }

            return transformedResponse;
        }

        if (this.requestOptions.parseJSON && !this.requestOptions.transformResponse) {
            const jsonResponse = JSON.parse(await response.text());

            if (this.requestOptions.cache) {
                cache.set(cacheKey, jsonResponse, this.requestOptions.cache.expiresIn);
            }

            return jsonResponse;
        }

        if (this.requestOptions.cache) {
            cache.set(cacheKey, response.text(), this.requestOptions.cache.expiresIn);
        }

        return response.text();
    }

    /**
     * Set a request headers
     *
     * @private
     */
    private setHeaders(): HeadersInit {
        const requestHeaders = new Headers();

        requestHeaders.set('Content-Type', 'application/json');

        if (this.requestOptions.headers) {
          for (const key in this.requestOptions.headers) {
              requestHeaders.set(key, this.requestOptions.headers[key]);
          }
          return requestHeaders;
        }
        return requestHeaders;
    }

    private generateCacheKey(method: string, url: string, options: IRequestOptions): string {
        const { headers, queryParams } = options;

        // Create a unique key
        return `${method}:${url}:${JSON.stringify(headers)}:${JSON.stringify(queryParams)}`;
    }
}