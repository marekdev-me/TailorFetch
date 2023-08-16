export default class Response {

    public data: any;

    public status: number;

    public statusText: string;

    public headers: any;

    public config: any;

    public request: any;

    constructor(data: any, status: number, statusText: string, headers: any, config: any, request: any) {
        this.data = data;
        this.status = status;
        this.statusText = statusText;
        this.headers = headers;
        this.config = config;
        this.request = request;
    }
}