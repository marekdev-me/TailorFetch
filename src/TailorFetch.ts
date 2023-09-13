import IRequestOptions from "./IRequestOptions";
import Request from "./Request";
import TailorResponse from "./Response";

export default class TailorFetch {
    /**
     * 
     * @param urlStr {string} Url to make request to
     * @param method {string} Request method to make request with
     * @param options {IRequestOptions} Request options
     * 
     * @returns {TailorResponse | undefined}
     */
    static async make(urlStr: string, method: 'GET'|'POST'|'PUT'|'PATCH'|'DELETE'|'CONNECT'|'HEAD'|'OPTIONS', options?: IRequestOptions): Promise<TailorResponse | undefined> {
        const request = new Request(urlStr, method, { ...options });

        return await request.make();
    }

    /**
     * Make an HTTP GET request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Request options to add to request
     * 
     * @returns {TailorResponse | undefined}
     */ 
    static async GET(urlStr: string, options?: IRequestOptions): Promise<TailorResponse | undefined> {
        const request = new Request(urlStr, 'GET', { ...options });

        return await request.make();
    }


    /**
     * Make an HTTP POST request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Request options to add to request
     * 
     * @returns {TailorResponse | undefined}
     */
    static async POST(urlStr: string, options?: IRequestOptions): Promise<TailorResponse | undefined> {
        const request = new Request(urlStr, 'POST', { ...options });

        return await request.make();
    }

    /**
     * Make an HTTP PUT request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Request options to add to request
     * 
     * @returns {TailorResponse | undefined}
     */
    static async PUT(urlStr: string, options?: IRequestOptions): Promise<TailorResponse | undefined> {
        const request = new Request(urlStr, 'PUT', { ...options });

        return await request.make();
    }

    /**
     * Make an HTTP PATCH request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Options to make request to
     * 
     * @returns {TailorResponse | undefined}
     */
    static async PATCH(urlStr: string, options?: IRequestOptions): Promise<TailorResponse | undefined> {
        const request = new Request(urlStr, 'PATCH', { ...options });

        return await request.make();
    }

    /**
     * Make an HTTP DELETE request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Options to add to request
     * 
     * @returns {TailorResponse | undefined}
     */
    static async DELETE(urlStr: string, options?: IRequestOptions): Promise<TailorResponse | undefined> {
        const request = new Request(urlStr, 'DELETE', { ...options });

        return await request.make();
    }

    /**
     * 
     * @param urlStr {string} URL to make a request to 
     * @param options {IRequestOptions} Options to add to request
     * 
     * @returns {TailorResponse | undefined} 
     */
    static async HEAD(urlStr: string, options?: IRequestOptions): Promise<TailorResponse | undefined> {
        const request = new Request(urlStr, 'HEAD', { ...options });

        return request.make();
    }

    /**
     * 
     * @param urlStr {string} URL to make request to
     * @param options {IRequestOptions} Options to add to request
     * 
     * @returns {TailorResponse | undefined}
     */
    static async OPTIONS(urlStr: string, options?: IRequestOptions): Promise<TailorResponse | undefined> {
        const request = new Request(urlStr, 'OPTIONS', { ...options });

        return await request.make();
    }
}