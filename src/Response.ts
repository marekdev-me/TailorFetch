import IRequestOptions from "./IRequestOptions";

export default class TailorResponse {

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
    public config: IRequestOptions;

    /**
     * Whether returned response was cached or not
     */
    public isCached: boolean;

    /**
     * Response object
     */
    public response: Response | undefined;

    constructor(data: any, response: Response | undefined, config: IRequestOptions, isCached: boolean = false) {
        this.data = data;
        this.status = response?.status;
        this.statusText = response?.statusText;
        this.headers = response?.headers;
        this.config = config;
        this.isCached = isCached;
        this.response = response;
    }

    toObject() {
        return {
            data: this.data,
            status: this.status,
            statusText: this.statusText,
            headers: this.headers,
            config: this.config,
        }
    }

    /**
     * Return response in JSON format
     */
    json(): string | undefined {
        if (!this.config.parseJSON && this.data) {
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
}