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

        // Intercept request
        if (this.requestOptions.requestInterceptor) {
            const modifiedRequestOptions = this.requestOptions.requestInterceptor.intercept(requestOptionsObject);
            Object.assign(requestOptionsObject, modifiedRequestOptions);
        }

        try {
            // Make an HTTP request
            this.response = await fetch(this.urlStr, requestOptionsObject);

            if (this.requestOptions.onProgress && this.response.body) {
                const reader = this.response.body.getReader();
                const contentLength = Number(this.response.headers.get('content-length')) | 0;

                let loadedBytes = 0;
                const requestOptions = this.requestOptions;

                const body = new ReadableStream({
                  async start(controller) {
                      while (true) {
                          const { done, value } = await reader.read();

                          if (done) {
                              controller.close();
                              break;
                          }

                          loadedBytes += value?.length || 0;
                          if (requestOptions.onProgress) {
                              requestOptions.onProgress(loadedBytes, contentLength);
                          }

                          controller.enqueue(value);
                      }
                  }
                });

                return await this.handleReadableStreamResponse(body);
            }

            // Handle response
            return await this.handleResponse(this.response);

        } catch (error) {
            console.log(error);
            
            if (this.requestOptions.retry) {
                if (this.retryCount < this.requestOptions.retry.maxRetries) {
                    await this.sleep(this.requestOptions.retry.retryDelay || 0);
                    this.retryCount++;
                    return this.make();
                }

                if (this.requestOptions.onError) {
                    this.requestOptions.onError(this.requestOptions, this.response, error);
                }
            }
        }

        return new TailorResponse(undefined, this.response, this.requestOptions, false);
    }

    /**
     * Handle Readable Stream response
     *
     * @param response {ReadableStream<any>} Readable stream to read
     *
     * @private
     */
    private async handleReadableStreamResponse(response: ReadableStream): Promise<TailorResponse> {
        let transformedResponse;
        let responseAsString = await this.readResponseBodyAsString(response);

        if (this.requestOptions.transformResponse) {
            if (this.requestOptions.json) {
                const parsedResponse = JSON.parse(responseAsString);
                transformedResponse = this.requestOptions.transformResponse.transform(parsedResponse, this.requestOptions);

                // Send response back
                return new TailorResponse(transformedResponse, this.response, this.requestOptions);
            }
            transformedResponse = this.requestOptions.transformResponse.transform(responseAsString, this.requestOptions);

            // Send response back
            return new TailorResponse(transformedResponse, this.response, this.requestOptions);
        }

        // Send response back
        return new TailorResponse(responseAsString, this.response, this.requestOptions);
    }

    private async readResponseBodyAsString(body: ReadableStream): Promise<string> {
        const reader = body.getReader();
        let text = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            text += new TextDecoder().decode(value);
        }

        return text;
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
            const cacheResponse = await Cache.get(cacheKey, this.requestOptions);
            if (cacheResponse) {
                return new TailorResponse(cacheResponse, this.response, this.requestOptions, true);
            }
        }

        if (this.requestOptions.transformResponse) {
            if (this.requestOptions.json) {
                const transformedResponse = this.requestOptions.transformResponse.transform(JSON.parse(await response.text()), this.requestOptions);
                if (this.requestOptions.cache) {
                    Cache.set(cacheKey, transformedResponse, this.requestOptions, this.requestOptions.cache.expiresIn);
                }
                return new TailorResponse(transformedResponse, this.response, this.requestOptions);
            }

            const transformedResponse = this.requestOptions.transformResponse.transform(await response.text(), this.requestOptions);

            if (this.requestOptions.cache) {
                Cache.set(cacheKey, transformedResponse, this.requestOptions, this.requestOptions.cache.expiresIn);
            }

            return new TailorResponse(transformedResponse, this.response, this.requestOptions);
        }

        if (this.requestOptions.json && !this.requestOptions.transformResponse) {
            const jsonResponse = JSON.parse(await response.text());

            if (this.requestOptions.cache) {
                Cache.set(cacheKey, jsonResponse, this.requestOptions, this.requestOptions.cache.expiresIn);
            }

            return new TailorResponse(jsonResponse, this.response, this.requestOptions);
        }

        if (this.requestOptions.cache) {
            Cache.set(cacheKey, response.text(), this.requestOptions,  this.requestOptions.cache.expiresIn);
        }

        if (response.body) {
            return new TailorResponse(await response.text(), this.response, this.requestOptions);
        }

        return new TailorResponse(undefined, this.response, this.requestOptions);
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

        if (this.requestOptions.headers) {

            // Add an authentication headers
            if (this.requestOptions.auth) {
                const { type, username, password } = this.requestOptions.auth;

                switch (type) {
                    case "basic": {
                        requestHeaders.set('Authorization', `Basic ${btoa(`${username}:${password}`)}`);
                        break;
                    }
                    case "digest": {
                        throw new Error("Not yet implemented");
                    }
                }
            }

            // Add rest of the headers supplied by user
            for (const key in this.requestOptions.headers) {
                requestHeaders.set(key, this.requestOptions.headers[key]);
            }
            return requestHeaders;
        }

        return requestHeaders;
    }
}