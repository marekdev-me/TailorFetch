import IRequestOptions from "./IRequestOptions";
import Request from "./Request";

export default class TailorFetch {

    /**
     * Make an HTTP GET request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Request options to add to request
     */
    static async GET(urlStr: string, options: IRequestOptions): Promise<any> {
        const request = new Request(urlStr, 'GET', { ...options });

        return {
            data: await request.make(),
            config: options,
            request
        }
    }


    /**
     * Make an HTTP POST request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Request options to add to request
     */
    static async POST(urlStr: string, options: IRequestOptions): Promise<any> {
        const request = new Request(urlStr, 'POST', { ...options });

        return {
            data: await request.make(),
            config: options,
            request
        }
    }

    /**
     * Make an HTTP PUT request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Request options to add to request
     */
    static async PUT(urlStr: string, options: IRequestOptions): Promise<any> {
        const request = new Request(urlStr, 'PUT', { ...options });

        return {
            data: await request.make(),
            config: options,
            request
        }
    }

    /**
     * Make an HTTP PATCH request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Options to make request to
     * @constructor
     */
    static async PATCH(urlStr: string, options: IRequestOptions): Promise<any> {
        const request = new Request(urlStr, 'PATCH', { ...options });

        return {
            data: await request.make(),
            config: options,
            request
        }
    }

    /**
     * Make an HTTP DELETE request
     *
     * @param urlStr {string} Url to make request to
     * @param options {IRequestOptions} Options to add to request
     */
    static async DELETE(urlStr: string, options: IRequestOptions): Promise<any> {
        const request = new Request(urlStr, 'DELETE', { ...options });

        return {
            data: await request.make(),
            config: options,
            request
        }
    }

    static async OPTIONS(): Promise<any> {
        throw new Error("Not yet implemented");
    }
}