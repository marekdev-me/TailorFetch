import IRequestOptions from "./IRequestOptions";

export default class TailorResponse {

    public data: any;

    public status: number | undefined;

    public statusText: string | undefined;

    public headers: {[key: string]: string};

    public config: IRequestOptions;

    constructor(data: any, status: number | undefined, statusText: string | undefined, headers: any, config: IRequestOptions) {
        this.data = data;
        this.status = status;
        this.statusText = statusText;
        this.headers = headers;
        this.config = config;
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