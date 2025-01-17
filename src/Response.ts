import IRequestOptions from "./IRequestOptions";

export default class TailorResponse {

    public name: string | undefined = 'TailorResponse';

    /**
     * Response data
     */
    public data: any;

    /**
     * Request response status HTTP code
     */
    public status: number | undefined;

    /**
     * Request response status HTTP status text
     */
    public statusText: string | undefined;

    /**
     * Request headers
     */
    public headers: Headers | undefined;

    /**
     * Request configuration
     */
    public requestOptions: IRequestOptions;

    /**
     * Whether returned response was cached or not
     */
    public isCached: boolean;

    /**
     * Response object
     */
    public response: Response | undefined;

    constructor(data: any, response: Response | undefined, requestOptions: IRequestOptions, isCached: boolean = false) {
        this.name = requestOptions.name
        this.data = data;
        this.status = response?.status;
        this.statusText = response?.statusText;
        this.headers = response?.headers;
        this.requestOptions = requestOptions;
        this.isCached = isCached;
        this.response = response;
    }

    // TODO: This is probably not needed here
    toObject() {
        return {
            name: this.name,
            data: this.data,
            status: this.status,
            statusText: this.statusText,
            headers: this.headers,
            requestOptions: this.requestOptions,
        }
    }

    async text(): Promise<string | undefined> {
        return await this.response?.text();
    }

    /**
     * Return response in JSON format
     */
    json(): string | undefined {
        if (!this.requestOptions.json && this.data) {
            return JSON.parse(this.data);
        }

        return this.data;
    }

    /**
     * Returns whether request was successful
     */
    successful(): boolean {
        return this.status ? this.status >= 200 && this.status < 300 : false;
    }

    /**
     * Returns whether request has failed
     */
    failed(): boolean {
        return this.status ? this.status >= 400 : false;
    }

    /**
     * Returns whether request was a client error
     */
    clientError(): boolean {
        return this.status ? this.status >= 400 && this.status < 500 : false;
    }

    /**
     * Returns whether request was a server error
     */
    serverError(): boolean {
        return this.status ? this.status >= 500 && this.status < 600 : false;
    }

    /**
     * 200 OK
     * 
     * @returns {boolean} Whether the request status was 200
     */
    ok(): boolean {
        return this.status == 200;
    }

    /**
     * 201 Created
     * 
     * @returns {boolean} Whether request status was 201
     */
    created(): boolean {
        return this.status == 201;
    }

    /**
     * 202 Created
     * 
     * @returns {boolean} Whether request status was 202
     */
    accepted(): boolean {
        return this.status == 202;
    }

    /**
     * 204 No Content
     * 
     * @returns {boolean} Whether the request status was 204
     */
    noContent(): boolean {
        return this.status == 204;
    }

    /**
     * 301 Moved Permanently
     * 
     * @returns {boolean} Whether the request status was 301
     */
    movedPermanently(): boolean {
        return this.status == 301;
    }

    /**
     * 302 Found
     * 
     * @returns {boolean} Whether the request status was 302
     */
    found(): boolean {
        return this.status == 302;
    }

    /**
     * 400 Bad Request
     * 
     * @returns {boolean} Whether the request status was 400
     */
    badRequest(): boolean {
        return this.status == 400;
    }

    /**
     * 401 Unauthorized
     * 
     * @returns {boolean} Weather the request status was 401
     */
    unauthorized(): boolean {
        return this.status == 401;
    }

    /**
     * 402 Payment Required
     * 
     * @returns {boolean} Whether the request status was 402
     */
    paymentRequired(): boolean {
        return this.status == 402;
    }

    /**
     * 403 Forbidden
     * 
     * @returns {boolean} Whether the request status was 403
     */
    forbidden(): boolean {
        return this.status == 403;
    }

    /**
     * 404 Not Found
     * 
     * @returns {boolean} Whether the request status was 404
     */
    notFound(): boolean {
        return this.status == 404;
    }

    /**
     * 408 Request Timeout
     * 
     * @returns {boolean} Whether the request status was 408
     */
    requestTimeout(): boolean {
        return this.status == 408;
    }

    /**
     * 409 Conflict
     * 
     * @returns {boolean} Whether the request status was 409
     */
    conflict(): boolean {
        return this.status == 409;
    }

    /**
     * 422 Unprocessable Entity
     * 
     * @returns {boolean} Whether the request status was 422
     */
    unprocessableEntity(): boolean {
        return this.status == 422;
    }

    /**
     * 429 Too Many Requests
     * 
     * @returns {boolean} Whether the request status was 429
     */
    tooManyRequests(): boolean {
        return this.status == 429;
    }
}