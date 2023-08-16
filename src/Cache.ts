import IRequestOptions from "./IRequestOptions";

class Cache {

    private cache: { [key: string]: { value: any; expires: number; }; } | undefined;

    /**
     * Get an HTTP request cache entry
     *
     * @param key {string} Key to retrieve
     */
    get(key: string): any {
        if (this.cache) {
            const entry= this.cache[key];
            if (entry && entry.expires > Date.now()) {
                return entry.value;
            }
            return undefined;
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
        if (this.cache) {
            this.cache[key] = {value, expires};
        }
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
        const { headers, queryParams } = options;

        // Create a unique key
        return `${method}:${url}:${JSON.stringify(headers)}:${JSON.stringify(queryParams)}`;
    }
}

export default new Cache();