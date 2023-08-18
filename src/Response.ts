import IRequestOptions from "./IRequestOptions";

export default class TailorResponse {

    public data: any;

    public status: number | undefined;

    public statusText: string | undefined;

    public headers: {[key: string]: string};

    public config: IRequestOptions;

    public isCached: boolean;

    constructor(data: any, status: number | undefined, statusText: string | undefined, headers: any, config: IRequestOptions, isCached: boolean = false) {
        this.data = data;
        this.status = status;
        this.statusText = statusText;
        this.headers = headers;
        this.config = config;
        this.isCached = isCached;
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
}