import IRequestOptions from "./IRequestOptions";
import Cache from "./Cache";
import TailorResponse from "./Response";

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
    private readonly requestOptions: IRequestOptions;

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

    /**
     * Attempts count
     *
     * @private
     */
    private retryCount = 0;

    constructor(urlStr: string, method: string, requestOptions: IRequestOptions, signal?: AbortSignal) {
        this.urlStr = new URL(urlStr);
        this.method = method;
        this.requestOptions = requestOptions;
        this.abortSignal = signal;
    }

    /**
     * Make an HTTP request to a remote URL
     */
    async make(): Promise<TailorResponse | undefined> {

        const requestOptionsObject: RequestInit = {
            method: this.method,
            headers: this.setHeaders(),
            mode: this.requestOptions.requestMode,
            body: this.requestOptions.body,
            cache: this.requestOptions.requestCache,
            credentials: this.requestOptions.requestCredentials,
            signal: this.abortSignal
        }

        try {
            // Make an HTTP request
            this.response = await fetch(this.urlStr, requestOptionsObject);

            // Handle response
            return await this.handleResponse(this.response);

        } catch (error) {
            if (this.requestOptions.retry) {
                if (this.retryCount < this.requestOptions.retry.maxRetries) {
                    await this.sleep(this.requestOptions.retry.retryDelay || 0);
                    this.retryCount++;
                    return this.make();
                }
            }
        }

        return undefined;
    }

    /**
     * Handle incoming HTTP request
     *
     * @param response { Response } HTTP response received from remote server
     *
     * @private
     */
    private async handleResponse(response: Response): Promise<TailorResponse> {

        // Generate the cache key
        const cacheKey = Cache.generateCacheKey(this.method, this.urlStr.toString(), this.requestOptions);

        if (this.method === 'GET') {
            const cacheResponse = Cache.get(cacheKey);
            if (cacheResponse) {
                return cacheResponse;
            }
        }

        if (this.requestOptions.transformResponse) {
            if (this.requestOptions.parseJSON) {
                const transformedResponse = this.requestOptions.transformResponse.transform(JSON.parse(await response.text()), this.requestOptions);
                if (this.requestOptions.cache) {
                    Cache.set(cacheKey, transformedResponse, this.requestOptions.cache.expiresIn);
                }
                return new TailorResponse(transformedResponse, this.response?.status, this.response?.statusText, this.requestOptions.headers, this.requestOptions);
            }

            const transformedResponse = this.requestOptions.transformResponse.transform(await response.text(), this.requestOptions);

            if (this.requestOptions.cache) {
                Cache.set(cacheKey, transformedResponse, this.requestOptions.cache.expiresIn);
            }

            return new TailorResponse(transformedResponse, this.response?.status, this.response?.statusText, this.requestOptions.headers, this.requestOptions);
        }

        if (this.requestOptions.parseJSON && !this.requestOptions.transformResponse) {
            const jsonResponse = JSON.parse(await response.text());

            if (this.requestOptions.cache) {
                Cache.set(cacheKey, jsonResponse, this.requestOptions.cache.expiresIn);
            }

            return new TailorResponse(jsonResponse, this.response?.status, this.response?.statusText, this.requestOptions.headers, this.requestOptions);
        }

        if (this.requestOptions.cache) {
            Cache.set(cacheKey, response.text(), this.requestOptions.cache.expiresIn);
        }

        return new TailorResponse(response.text(), this.response?.status, this.response?.statusText, this.requestOptions.headers, this.requestOptions);
    }


    /**
     * Delay request when attempting after failed request
     *
     * @param delay { number } Number of milliseconds to sleep for
     *
     * @private
     */
    private sleep(delay: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, delay));
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
}