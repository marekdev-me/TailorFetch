import IRequestOptions from "./IRequestOptions";

class Cache {

    private readonly cache: { [key: string]: { value: any; expires: number; }; } = {};

    /**
     * Get an HTTP request cache entry
     *
     * @param key {string} Key to retrieve
     */
    get(key: string): any {
        const entry= this.cache[key];
        if (entry && entry.expires > Date.now()) {
            return entry.value;
        }
        return undefined;
    }

    /**
     * Set a new HTTP request cache
     *
     * @param key {string} Key to set value to
     * @param value {any} Value to set
     * @param expiresInMilliseconds {number} Number to milliseconds
     */
    set(key: string, value: any, expiresInMilliseconds: number = 0): void {
        const expires = expiresInMilliseconds > 0 ? Date.now() + expiresInMilliseconds : Number.MAX_SAFE_INTEGER;
        this.cache[key] = {value, expires};
    }

    /**
     * Generate a new cache key when cache option is used on request
     *
     * @param method {string} HTTP method used for request
     * @param url {string} Url used to make a request to remote server
     * @param options {IRequestOptions} Request options attached to request
     *
     * @private
     */
     generateCacheKey(method: string, url: string, options: IRequestOptions): string {
        // Create a unique key
        return `${method}:${url}:${JSON.stringify(options.headers)}:${JSON.stringify(options.queryParams)}`;
    }
}

export default new Cache();